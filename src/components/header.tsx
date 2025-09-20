"use client";

import { LogIn, Logs, MapPin, User } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">J</span>
          </div>
          <span className="font-bold text-xl">Jiro Map</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href="/shops" className="flex items-center">
              <MapPin className="size-4 md:mr-2" />
              <span className="hidden md:block">店舗一覧</span>
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/records" className="flex items-center">
              <Logs className="size-4 md:mr-2" />
              <span className="hidden md:block">訪問記録</span>
            </Link>
          </Button>
          {session?.user ? (
            <Button asChild variant="outline">
              <Link href="/mypage" className="flex items-center">
                <User className="size-4 md:mr-2" />
                <span className="hidden md:block">マイページ</span>
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login" className="flex items-center">
                <LogIn className="size-4 md:mr-2" />
                <span className="hidden md:block">ログイン</span>
              </Link>
            </Button>
          )}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
