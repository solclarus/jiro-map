import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DeleteRecordButton } from "@/components/delete-record-button";
import { RecordForm } from "@/components/record-form";
import { getRecordById } from "@/data/record";

export const metadata: Metadata = {
  title: "編集",
};

export default async function EditRecord({
  params,
}: PageProps<"/records/[id]/edit">) {
  const recordId = (await params).id;
  const record = await getRecordById(recordId);

  if (!record) {
    redirect("/records");
  }

  return (
    <main className="container py-6 md:py-10">
      <RecordForm shopId={record.shopId} defaultValues={record} />
      <DeleteRecordButton recordId={record.id} />
    </main>
  );
}
