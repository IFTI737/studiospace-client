import { cn } from "cn";
import { TBookingStatus } from "@/types/booking.types";

const styles: Record<TBookingStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-700 ring-amber-500/30 dark:text-amber-300",
  Confirmed: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30 dark:text-emerald-300",
  Completed: "bg-sky-500/15 text-sky-700 ring-sky-500/30 dark:text-sky-300",
  Cancelled: "bg-rose-500/15 text-rose-700 ring-rose-500/30 dark:text-rose-300",
};

export default function StatusBadge({ status }: { status: TBookingStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1", styles[status])}>
      <span className={cn("size-1.5 rounded-full bg-current", status === "Pending" && "animate-pulse")} />
      {status}
    </span>
  );
}
