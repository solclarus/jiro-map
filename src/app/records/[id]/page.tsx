import { CalendarDays, MapPin, MessageSquare, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getRecordById } from "@/data/record";
import { verifySession } from "@/lib/session";

export const metadata: Metadata = {
  title: "訪問記録 - 詳細",
};

export default async function Record({ params }: PageProps<"/records/[id]">) {
  const recordId = (await params).id;
  const record = await getRecordById(recordId);
  const session = await verifySession();

  if (!record) {
    redirect("/records");
  }

  const isOwner = session.user.id === record.userId;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={`star-${rating}-${i}`}
          className={`h-5 w-5 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />,
      );
    }
    return stars;
  };

  return (
    <main className="container py-6 md:py-10 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/records"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← 記録一覧に戻る
        </Link>
      </div>

      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold">{record.shopId}</h1>
          </div>
          {isOwner && (
            <Button asChild>
              <Link href={`/records/${record.id}/edit`}>編集</Link>
            </Button>
          )}
        </div>

        {/* 基本情報 */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">訪問日時</p>
                <p className="text-lg font-medium">
                  {formatDate(record.visitedAt)}
                </p>
              </div>
            </div>

            {record.rating && (
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <div>
                  <p className="text-sm text-muted-foreground">評価</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(record.rating)}
                    </div>
                    <span className="text-lg font-medium">
                      {record.rating}/5
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">記録ID</p>
              <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                {record.id}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">最終更新</p>
              <p className="text-sm">{formatDate(record.updatedAt)}</p>
            </div>
          </div>
        </div>

        {/* メモ */}
        {record.notes && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">メモ</h2>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="whitespace-pre-wrap leading-relaxed">
                {record.notes}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
