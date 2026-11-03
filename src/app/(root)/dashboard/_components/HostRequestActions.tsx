"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, CheckCheck, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { apiFetch } from "@/lib/api";
import { TBooking, TBookingStatus } from "@/types/booking.types";

export default function HostRequestActions({ booking }: { booking: TBooking }) {
  const router = useRouter();
  const [busy, setBusy] = useState<TBookingStatus | null>(null);

  const update = async (status: TBookingStatus) => {
    setBusy(status);
    try {
      await apiFetch(`/bookings/${booking._id}/status`, { method: "PATCH", body: { status } });
      toast.success(`Booking marked as ${status}`);
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(null);
    }
  };

  if (booking.status === "Pending") {
    return (
      <div className="flex justify-end gap-2">
        <Button size="sm" className="rounded-full" onClick={() => update("Confirmed")} disabled={!!busy}>
          {busy === "Confirmed" ? <Spinner /> : <Check />} Confirm
        </Button>
        <Button size="sm" variant="outline" className="rounded-full" onClick={() => update("Cancelled")} disabled={!!busy}>
          {busy === "Cancelled" ? <Spinner /> : <X />} Decline
        </Button>
      </div>
    );
  }

  if (booking.status === "Confirmed") {
    return (
      <div className="flex justify-end">
        <Button size="sm" variant="outline" className="rounded-full" onClick={() => update("Completed")} disabled={!!busy}>
          {busy ? <Spinner /> : <CheckCheck />} Mark Completed
        </Button>
      </div>
    );
  }

  return <span className="block text-right text-xs text-muted-foreground">No action needed</span>;
}
