"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { apiFetch } from "@/lib/api";
import { downloadInvoice } from "@/components/booking/downloadInvoice";
import { TBooking } from "@/types/booking.types";

export default function BookingActions({ booking }: { booking: TBooking }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleCancel = async () => {
    setBusy(true);
    try {
      await apiFetch(`/bookings/${booking._id}/cancel`, { method: "PATCH" });
      toast.success("Booking cancelled");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {(booking.status === "Confirmed" || booking.status === "Completed") && (
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={() => {
            downloadInvoice(booking);
            toast.success("Invoice downloaded");
          }}
        >
          <Download /> Invoice PDF
        </Button>
      )}

      {booking.status === "Pending" && (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger
            render={<Button size="sm" variant="outline" className="rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive" />}
          >
            <XCircle /> Cancel Booking
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
              <AlertDialogDescription>
                Your request for {booking.studioTitle} will be cancelled and the slot will open for others.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep booking</AlertDialogCancel>
              <Button variant="destructive" onClick={handleCancel} disabled={busy}>
                {busy && <Spinner />} Yes, cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
