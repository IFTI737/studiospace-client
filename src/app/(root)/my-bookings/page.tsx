import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, CalendarX, Clock, MapPin, Search, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import PageHeader from "@/components/shared/PageHeader";
import SafeImage from "@/components/shared/SafeImage";
import StatusBadge from "@/components/booking/StatusBadge";
import AutoRefresh from "@/components/shared/AutoRefresh";
import { getSessionUser, serverFetch } from "@/lib/serverApi";
import { formatMoney } from "@/lib/constants";
import { formatDate, formatTimeRange } from "@/lib/format";
import { TBooking } from "@/types/booking.types";
import BookingActions from "./_components/BookingActions";

export const metadata: Metadata = { title: "My Bookings | StudioSpace" };

export default async function MyBookingsPage() {
  const user = await getSessionUser();
  const bookings = (await serverFetch<TBooking[]>(`/my-bookings/${encodeURIComponent(user?.email ?? "")}`)) ?? [];

  return (
    <section className="container mx-auto px-4 py-12">
      <AutoRefresh />
      <PageHeader
        eyebrow="Creator"
        title="My Bookings"
        description={bookings.length ? `You have ${bookings.length} booking${bookings.length > 1 ? "s" : ""}.` : "Track every studio you reserve."}
      >
        <Link href="/studios" className={buttonVariants({ size: "lg", className: "rounded-full" })}>
          <Search /> Explore Studios
        </Link>
      </PageHeader>

      {bookings.length === 0 ? (
        <Empty className="border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon"><CalendarX /></EmptyMedia>
            <EmptyTitle className="text-lg">No bookings yet</EmptyTitle>
            <EmptyDescription>Find a studio you love and reserve your first session.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/studios" className={buttonVariants({ className: "rounded-full" })}>
              <Search /> Browse Studios
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {bookings.map((b) => (
            <article key={b._id} className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md sm:flex-row">
              <div className="relative aspect-[16/10] shrink-0 bg-muted sm:aspect-auto sm:w-44">
                <SafeImage src={b.studioImage} alt={b.studioTitle} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/studios/${b.studioId}`} className="text-lg font-semibold hover:text-primary">
                    {b.studioTitle}
                  </Link>
                  <StatusBadge status={b.status} />
                </div>
                <div className="grid gap-1.5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><CalendarDays className="size-4" /> {formatDate(b.date)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="size-4" /> {formatTimeRange(b.startTime, b.hours)} ({b.hours}h)</span>
                  <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {b.studioLocation}</span>
                  <span className="flex items-center gap-1.5"><Users className="size-4" /> {b.guests} guest{b.guests > 1 ? "s" : ""}</span>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="font-heading text-xl font-bold text-primary">{formatMoney(b.totalPrice)}</span>
                  <BookingActions booking={b} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
