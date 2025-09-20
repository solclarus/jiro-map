"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = theme === "dark" ? "light" : "dark";
    setTheme(currentTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="shrink-0 text-muted-foreground hover:text-primary"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
}
