import { and, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecordForm } from "@/components/record-form";
import { db } from "@/db";
import { records } from "@/db/schemas/record";
import { verifySession } from "@/lib/session";

export const metadata: Metadata = {
  title: "訪問記録を編集",
};

interface EditRecordPageProps {
  params: {
    id: string;
  };
}

export default async function Shop({ params }: EditRecordPageProps) {
  const session = await verifySession();
  const userId = session.user.id;

  const [record] = await db
    .select()
    .from(records)
    .where(and(eq(records.id, params.id), eq(records.userId, userId)));

  if (!record) {
    notFound();
  }

  return (
    <main className="container py-6 md:py-10">
      <RecordForm shopId={record.shopId} />
    </main>
  );
}
