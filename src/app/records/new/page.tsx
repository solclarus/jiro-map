import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RecordForm } from "@/components/record-form";

export const metadata: Metadata = {
  title: "新しい訪問記録",
};

interface NewRecordPageProps {
  searchParams: Promise<{
    shopId?: string;
  }>;
}

export default async function NewRecord({ searchParams }: NewRecordPageProps) {
  const { shopId } = await searchParams;

  if (!shopId) {
    redirect("/records");
  }

  return (
    <main className="container py-6 md:py-10">
      <RecordForm shopId={shopId} />
    </main>
  );
}
