"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();

  return (
    <Card className="w-full md:max-w-sm mx-auto">
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">ようこそ</h1>
            <p className="text-muted-foreground text-balance">
              ゲストとしてログインしてください
            </p>
          </div>
          <Button
            onClick={() => {
              authClient.signIn.anonymous().then(() => {
                router.push("/mypage");
              });
            }}
            type="button"
            className="w-full"
          >
            ゲストでログイン
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
