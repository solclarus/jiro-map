import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function Login() {
  return (
    <main className="container py-6 md:py-10">
      <LoginForm />
    </main>
  );
}
