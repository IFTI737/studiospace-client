"use client";

import { useEffect, useState } from "react";
import { Check, KeyRound, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import PasswordInput from "@/app/(auth)/_components/PasswordInput";
import { setFirstPassword } from "../actions";

const passwordRules = [
  { label: "At least 6 characters", test: (p: string) => p.length >= 6 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
];

export default function PasswordSection() {
  // null = still checking, true = has email/password login, false = Google only
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [logoutOthers, setLogoutOthers] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    authClient.listAccounts().then(({ data }) => {
      setHasPassword(Boolean(data?.some((a) => a.providerId === "credential")));
    });
  }, []);

  if (hasPassword === null) return <Skeleton className="h-72 rounded-3xl" />;

  const failedRule = passwordRules.find((r) => !r.test(next));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (failedRule) return toast.error(`New password needs: ${failedRule.label.toLowerCase()}`);
    if (next !== confirm) return toast.error("New passwords do not match");
    if (hasPassword && current === next) return toast.error("New password must be different from the current one");

    setSaving(true);
    const toastId = toast.loading(hasPassword ? "Changing your password..." : "Adding a password...");

    if (hasPassword) {
      const { error } = await authClient.changePassword({
        currentPassword: current,
        newPassword: next,
        revokeOtherSessions: logoutOthers,
      });
      if (error) {
        const msg = /invalid password/i.test(error.message ?? "") ? "Current password is wrong" : error.message;
        toast.error(msg || "Could not change your password", { id: toastId });
      } else {
        toast.success("Password changed successfully", { id: toastId });
        setCurrent("");
        setNext("");
        setConfirm("");
      }
    } else {
      const res = await setFirstPassword(next);
      if (res.ok) {
        toast.success(res.message, { id: toastId });
        setHasPassword(true);
        setNext("");
        setConfirm("");
      } else {
        toast.error(res.message, { id: toastId });
      }
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <KeyRound className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold">{hasPassword ? "Change password" : "Add a password"}</h2>
          <p className="text-sm text-muted-foreground">
            {hasPassword
              ? "Enter your current password, then choose a new one."
              : "You signed up with Google. Add a password to also log in with your email."}
          </p>
        </div>
      </div>

      <FieldGroup className="mt-6">
        {hasPassword && (
          <Field>
            <FieldLabel htmlFor="currentPassword">Current password</FieldLabel>
            <PasswordInput id="currentPassword" value={current} onChange={(e) => setCurrent(e.target.value)} autoComplete="current-password" required />
          </Field>
        )}
        <Field>
          <FieldLabel htmlFor="newPassword">New password</FieldLabel>
          <PasswordInput id="newPassword" value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" required />
          {next && (
            <ul className="mt-1 grid gap-1 text-xs sm:grid-cols-3">
              {passwordRules.map((rule) => {
                const ok = rule.test(next);
                return (
                  <li key={rule.label} className={cn("flex items-center gap-1", ok ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
                    {ok ? <Check className="size-3.5" /> : <X className="size-3.5" />} {rule.label}
                  </li>
                );
              })}
            </ul>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm new password</FieldLabel>
          <PasswordInput id="confirmPassword" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" required />
          {confirm && confirm !== next && <p className="text-xs text-destructive">Passwords do not match</p>}
        </Field>
        {hasPassword && (
          <div className="flex items-center gap-2">
            <Checkbox id="logoutOthers" checked={logoutOthers} onCheckedChange={(v) => setLogoutOthers(Boolean(v))} />
            <Label htmlFor="logoutOthers" className="font-normal">Log out from other devices</Label>
          </div>
        )}
      </FieldGroup>

      <div className="mt-6 flex justify-end">
        <Button type="submit" size="lg" className="rounded-full px-6" disabled={saving}>
          {saving ? <Spinner /> : <KeyRound />} {saving ? "Saving..." : hasPassword ? "Change password" : "Add password"}
        </Button>
      </div>
    </form>
  );
}
