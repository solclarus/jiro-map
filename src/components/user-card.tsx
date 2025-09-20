"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import type { User } from "@/types/user";

export function UserCard({ user }: { user: User }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <Card className="w-full md:max-w-sm mx-auto">
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <Avatar className="w-16 h-16 border">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.id}`}
            alt={user.name ?? user.email ?? "user"}
          />
          <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-lg font-bold">{user.name}</h1>
          <p className="text-muted-foreground text-sm break-all">{user.email}</p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="w-full">
          <LogOut className="size-4 mr-2" />
          ログアウト
        </Button>
      </CardContent>
    </Card>
  );
}
