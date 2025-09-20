import { Card, CardContent } from "@/components/ui/card";
import type { Record } from "@/types/record";

export function RecordCard({ record }: { record: Record }) {
  return (
    <div>
      <Card>
        <CardContent>
          <h1>
            {record.shopId} - {record.visitedAt.toDateString()}
          </h1>
          <p>Rating: {record.rating ?? "N/A"}</p>
          <p>Notes: {record.notes ?? "No notes"}</p>
          <p>Created At: {record.createdAt.toDateString()}</p>
          <p>Updated At: {record.updatedAt.toDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
