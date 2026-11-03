import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, ShieldCheck, Star, Users, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { formatMoney } from "@/lib/constants";
import { TStudio } from "@/types/studio.types";
import Gallery from "./_components/Gallery";
import BookingDialog from "./_components/BookingDialog";
import Reviews from "./_components/Reviews";

const getStudio = cache(async (id: string): Promise<TStudio | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const studio = await getStudio(id);
  return { title: `${studio?.title ?? "Studio Not Found"} | StudioSpace` };
}

export default async function StudioDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const studio = await getStudio(id);
  if (!studio) notFound();

  const images = [studio.image, ...(studio.gallery ?? [])].filter(Boolean);

  return (
    <section className="container mx-auto px-4 py-10">
      <Link href="/studios" className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-6 -ml-2.5" })}>
        <ArrowLeft /> All Studios
      </Link>

      <div className="grid items-start gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <Gallery images={images} title={studio.title} />

          <div>
            <Badge>{studio.category}</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{studio.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <MapPin className="size-4" /> {studio.location}
              </p>
              <p className="flex items-center gap-1.5">
                <Users className="size-4" /> Up to {studio.maxCapacity} people
              </p>
              <p className="flex items-center gap-1.5">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">{studio.rating ? studio.rating.toFixed(1) : "New"}</span>
                <span>({studio.reviews?.length ?? 0} reviews)</span>
              </p>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="mt-3 leading-relaxed whitespace-pre-line text-muted-foreground">{studio.overview}</p>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold">Amenities</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {studio.amenities?.map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-xl border bg-card px-4 py-3 text-sm">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold">Your Host</h2>
            <div className="mt-4 flex items-center gap-4 rounded-2xl border bg-card p-5">
              <Avatar size="lg">
                {studio.ownerImage && <AvatarImage src={studio.ownerImage} alt={studio.ownerName} />}
                <AvatarFallback>{getInitials(studio.ownerName)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{studio.ownerName}</p>
                <p className="text-sm text-muted-foreground">{studio.ownerEmail}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="size-3.5" /> Verified host
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <Reviews studioId={studio._id} reviews={studio.reviews ?? []} ownerEmail={studio.ownerEmail} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-3xl border bg-card p-6 shadow-xl shadow-primary/5">
            <p>
              <span className="font-heading text-4xl font-bold text-primary">{formatMoney(studio.hourlyRate)}</span>
              <span className="text-muted-foreground"> / hour</span>
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><Wallet className="size-4" /> Security deposit</span>
                <span className="font-medium">{formatMoney(studio.securityDeposit)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><Users className="size-4" /> Max capacity</span>
                <span className="font-medium">{studio.maxCapacity} people</span>
              </li>
            </ul>
            <div className="mt-6">
              <BookingDialog studio={studio} />
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">Free cancellation while your booking is pending.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
