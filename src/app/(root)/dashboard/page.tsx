import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CalendarCheck, DollarSign, Heart, Hourglass, Inbox, PlusCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/booking/StatusBadge";
import AutoRefresh from "@/components/shared/AutoRefresh";
import { getSessionUser, serverFetch } from "@/lib/serverApi";
import { formatMoney } from "@/lib/constants";
import { formatDate, formatTimeRange } from "@/lib/format";
import { getInitials } from "@/lib/utils";
import { TBooking } from "@/types/booking.types";
import { TStudio } from "@/types/studio.types";
import HostRequestActions from "./_components/HostRequestActions";

export const metadata: Metadata = { title: "Dashboard | StudioSpace" };

export default async function DashboardPage() {
  const user = await getSessionUser();
  const email = encodeURIComponent(user?.email ?? "");

  const [listings, bookings, requests] = await Promise.all([
    serverFetch<TStudio[]>(`/my-listings/${email}`),
    serverFetch<TBooking[]>(`/my-bookings/${email}`),
    serverFetch<TBooking[]>(`/host-bookings/${email}`),
  ]);

  const hostRequests = requests ?? [];
  const pending = hostRequests.filter((r) => r.status === "Pending").length;
  const earnings = hostRequests
    .filter((r) => r.status === "Confirmed" || r.status === "Completed")
    .reduce((sum, r) => sum + r.totalPrice, 0);

  const stats = [
    { label: "My Listings", value: listings?.length ?? 0, icon: Building2, href: "/my-listings" },
    { label: "My Bookings", value: bookings?.length ?? 0, icon: CalendarCheck, href: "/my-bookings" },
    { label: "Pending Requests", value: pending, icon: Hourglass, href: "#requests" },
    { label: "Host Earnings", value: formatMoney(earnings), icon: DollarSign, href: "#requests" },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <AutoRefresh />
      <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 text-background">
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-10 size-80 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative flex flex-wrap items-center gap-5">
          <Avatar className="size-16 ring-4 ring-primary/40">
            {user?.image && <AvatarImage src={user.image} alt={user.name} referrerPolicy="no-referrer" />}
            <AvatarFallback className="text-lg text-foreground">{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm text-background/70">Welcome back</p>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-sm text-background/70">{user?.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/add-studio" className={buttonVariants({ className: "rounded-full" })}>
              <PlusCircle /> Add New Studio
            </Link>
            <Link href="/saved" className={buttonVariants({ variant: "outline", className: "rounded-full border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background" })}>
              <Heart /> Saved
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="group rounded-2xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-5" />
            </span>
            <p className="mt-4 font-heading text-3xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </Link>
        ))}
      </div>

      <div id="requests" className="mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold">Booking requests for my studios</h2>
        <p className="mt-1 text-sm text-muted-foreground">Confirm or decline requests. Confirmed slots are blocked for other creators.</p>

        {hostRequests.length === 0 ? (
          <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed bg-card p-10 text-center">
            <Inbox className="size-10 text-muted-foreground" />
            <p className="mt-3 font-medium">No requests yet</p>
            <p className="text-sm text-muted-foreground">When creators book your studios, their requests appear here.</p>
          </div>
        ) : (
          <div className="mt-5 overflow-hidden rounded-2xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Studio</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-4 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hostRequests.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell className="pl-4 font-medium">{r.studioTitle}</TableCell>
                    <TableCell>
                      <div>{r.userName}</div>
                      <div className="text-xs text-muted-foreground">{r.userEmail}</div>
                    </TableCell>
                    <TableCell>
                      <div>{formatDate(r.date)}</div>
                      <div className="text-xs text-muted-foreground">{formatTimeRange(r.startTime, r.hours)}</div>
                    </TableCell>
                    <TableCell className="font-semibold text-primary">{formatMoney(r.totalPrice)}</TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                    <TableCell className="pr-4"><HostRequestActions booking={r} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}
