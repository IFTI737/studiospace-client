"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setSubmitting(true);
    setError("");
    const { data, error } = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (error) {
      const message = error.message || "Invalid email or password";
      setError(message);
      toast.error(message);
      setSubmitting(false);
      return;
    }

    toast.success(`Welcome back, ${data.user.name}!`);
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Log in to book and manage your studios.</p>
      </div>

      <GoogleButton redirectTo={redirectTo} />

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSeparator>or with email</FieldSeparator>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <button
                type="button"
                onClick={() => toast.info("Password reset is turned off for the review period. Please contact support.")}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <PasswordInput id="password" name="password" autoComplete="current-password" placeholder="••••••••" required />
          </Field>

          {error && <FieldError>{error}</FieldError>}

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting && <Spinner />}
            {submitting ? "Logging in..." : "Login"}
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
