import type { Metadata } from "next";
import { UserCard } from "@/components/user-card";
import { verifySession } from "@/lib/session";

export const metadata: Metadata = {
  title: "マイページ",
};

export default async function MyPage() {
  const session = await verifySession();

  return (
    <main className="container py-6 md:py-10">
      <UserCard user={session.user} />
    </main>
  );
}
