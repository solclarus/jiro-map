"use client";

import { LogIn, Logs, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">J</span>
          </div>
          <span className="font-bold text-xl">Jiro Map</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href="/records" className="flex items-center space-x-2">
              <Logs className="size-4" />
              <span>訪問記録</span>
            </Link>
          </Button>
          {session?.user ? (
            <Button asChild variant="outline">
              <Link href="/mypage" className="flex items-center space-x-2">
                <User className="size-4" />
                <span>マイページ</span>
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login" className="flex items-center space-x-2">
                <LogIn className="size-4" />
                <span>ログイン</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
