import { Suspense } from "react";
import type { Metadata } from "next";
import { Spinner } from "@/components/ui/spinner";
import LoginForm from "../_components/LoginForm";

export const metadata: Metadata = { title: "Login | StudioSpace" };

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner className="mx-auto size-8 text-primary" />}>
      <LoginForm />
    </Suspense>
  );
}
