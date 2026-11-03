"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "@/lib/auth-client";

export default function GoogleButton({ redirectTo = "/" }: { redirectTo?: string }) {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await signIn.social({ provider: "google", callbackURL: redirectTo });
    if (error) {
      toast.error(error.message || "Google login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button type="button" variant="outline" size="lg" className="w-full" onClick={handleGoogle} disabled={loading}>
      {loading ? (
        <Spinner />
      ) : (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z" />
        </svg>
      )}
      Continue with Google
    </Button>
  );
}
