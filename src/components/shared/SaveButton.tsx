"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

// Heart icon on studio cards: saves / un-saves a studio in MongoDB
export default function SaveButton({
  studioId,
  initialSaved = false,
  className,
}: {
  studioId: string;
  initialSaved?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [saved, setSaved] = useState(initialSaved);
  const [busy, setBusy] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      toast.info("Log in to save studios to your wishlist");
      router.push("/login");
      return;
    }
    setBusy(true);
    try {
      const res = await apiFetch<{ saved: boolean }>("/wishlist", {
        method: "POST",
        body: { studioId },
      });
      setSaved(res.saved);
      toast.success(res.saved ? "Saved to your wishlist" : "Removed from your wishlist");
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-label={saved ? "Remove from saved studios" : "Save studio"}
      aria-pressed={saved}
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-background/95 shadow-sm transition hover:scale-110 active:scale-95",
        className,
      )}
    >
      <Heart className={cn("size-4 transition", saved ? "fill-rose-500 text-rose-500" : "text-foreground")} />
    </button>
  );
}
