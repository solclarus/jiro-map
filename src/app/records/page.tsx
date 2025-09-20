import { RecordCard } from "@/components/record-card";

export default function Records() {
  const mockRecords = [
    {
      id: "1",
      userId: "user1",
      shopId: "shop1",
      visitedAt: new Date(),
      rating: 5,
      notes: "Great place!",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      userId: "user2",
      shopId: "shop2",
      visitedAt: new Date(),
      rating: 4,
      notes: "Good service.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <main className="container py-6 md:py-10">
      {mockRecords.map((record) => (
        <RecordCard key={record.id} record={record} />
      ))}
    </main>
  );
}
