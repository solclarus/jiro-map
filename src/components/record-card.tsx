"use client";

import {
  CalendarDays,
  MapPin,
  MessageSquare,
  MoreVertical,
  Pen,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteRecord } from "@/actions/record";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import type { Record } from "@/types/record";
import { Button } from "./ui/button";

export function RecordCard({ record }: { record: Record }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const isOwner = session?.user?.id === record.userId;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
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
          className={`size-4 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />,
      );
    }
    return stars;
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("この記録を削除しますか？")) return;

    try {
      await deleteRecord(record.id);
      toast.success("記録を削除しました");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("削除に失敗しました");
    }
  };

  return (
    <Link href={`/records/${record.id}`} className="w-full">
      <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-500" />
              <h3 className="font-semibold text-lg">{record.shopId}</h3>
            </div>
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/records/${record.id}/edit`}
                      className="flex items-center"
                    >
                      <Pen className="mr-2 h-4 w-4" />
                      編集
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    削除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            <span>{formatDate(record.visitedAt)}</span>
          </div>

          {record.rating && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">評価:</span>
              <div className="flex items-center gap-1">
                {renderStars(record.rating)}
              </div>
            </div>
          )}

          {record.notes && (
            <div className="flex items-start gap-2">
              <MessageSquare className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground line-clamp-2">
                {record.notes}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
