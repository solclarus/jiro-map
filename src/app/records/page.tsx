import { RecordCard } from "@/components/record-card";
import { getRecords } from "@/data/record";

export default async function Records() {
  const records = await getRecords();

  return (
    <main className="container py-6 md:py-10">
      <div className="grid gap-3 grid-cols-1 max-w-xl mx-auto">
        {records.map((record) => (
          <RecordCard key={record.id} record={record} />
        ))}
      </div>
    </main>
  );
}
