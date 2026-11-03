"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarPlus, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { formatMoney } from "@/lib/constants";
import { TStudio } from "@/types/studio.types";

// Hourly start times from 6:00 AM to 10:00 PM
const timeSlots = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 6;
  return { value: `${String(hour).padStart(2, "0")}:00`, label: `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}` };
});

const durations = [1, 2, 3, 4, 5, 6, 8];

export default function BookingDialog({ studio }: { studio: TStudio }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(2);
  const [submitting, setSubmitting] = useState(false);

  const isOwner = session?.user.email === studio.ownerEmail;
  const total = studio.hourlyRate * hours;
  const today = format(new Date(), "yyyy-MM-dd");

  const handleOpen = () => {
    if (!session) {
      toast.info("Please log in to book this studio");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    if (isOwner) {
      toast.info("This is your own studio. Manage it from My Listings.");
      return;
    }
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setSubmitting(true);
    try {
      await apiFetch("/bookings", {
        method: "POST",
        body: {
          studioId: studio._id,
          date: formData.get("date"),
          startTime: formData.get("startTime"),
          hours,
          guests: Number(formData.get("guests")),
          note: formData.get("note"),
        },
      });
      toast.success("Booking request sent! Status: Pending");
      setOpen(false);
      router.push("/my-bookings");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button size="lg" className="h-12 w-full rounded-full text-base shadow-lg shadow-primary/25" onClick={handleOpen}>
        <CalendarPlus /> Book Workspace Now
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Book {studio.title}</DialogTitle>
            <DialogDescription>Choose your date and hours. The host will confirm your request.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="date">Date</FieldLabel>
                <Input id="date" name="date" type="date" min={today} suppressHydrationWarning required />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="startTime">Start time</FieldLabel>
                  <NativeSelect id="startTime" name="startTime" defaultValue="" className="w-full" required>
                    <NativeSelectOption value="" disabled>
                      Select
                    </NativeSelectOption>
                    {timeSlots.map((slot) => (
                      <NativeSelectOption key={slot.value} value={slot.value}>
                        {slot.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </Field>
                <Field>
                  <FieldLabel htmlFor="hours">Duration</FieldLabel>
                  <NativeSelect id="hours" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full">
                    {durations.map((d) => (
                      <NativeSelectOption key={d} value={d}>
                        {d} hour{d > 1 ? "s" : ""}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="guests">Number of people (max {studio.maxCapacity})</FieldLabel>
                <Input id="guests" name="guests" type="number" min={1} max={studio.maxCapacity} defaultValue={1} required />
              </Field>

              <Field>
                <FieldLabel htmlFor="note">Note for the host (optional)</FieldLabel>
                <Textarea id="note" name="note" rows={2} placeholder="What are you shooting or recording?" />
              </Field>

              <div className="space-y-2 rounded-xl bg-muted/60 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatMoney(studio.hourlyRate)} × {hours} hour{hours > 1 ? "s" : ""}
                  </span>
                  <span>{formatMoney(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Refundable security deposit</span>
                  <span>{formatMoney(studio.securityDeposit)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatMoney(total)}</span>
                </div>
              </div>

              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-600" />
                You won&apos;t be charged until the host confirms.
              </p>

              <Button type="submit" size="lg" className="w-full rounded-full" disabled={submitting}>
                {submitting && <Spinner />}
                {submitting ? "Sending request..." : "Confirm Booking Request"}
              </Button>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
