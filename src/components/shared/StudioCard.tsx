import Link from "next/link";
import { ArrowUpRight, MapPin, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatMoney } from "@/lib/constants";
import { TStudio } from "@/types/studio.types";
import SafeImage from "./SafeImage";
import SaveButton from "./SaveButton";

export default function StudioCard({ studio, saved }: { studio: TStudio; saved?: boolean }) {
  const { _id, title, category, image, location, hourlyRate, rating, maxCapacity, reviews } = studio;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <SafeImage src={image} alt={title} className="transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <Badge className="absolute top-3 left-3 shadow">{category}</Badge>
        <SaveButton studioId={_id} initialSaved={saved} className="absolute top-3 right-3" />
        <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold backdrop-blur">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          {rating ? rating.toFixed(1) : "New"}
          {reviews?.length ? <span className="font-normal text-muted-foreground">({reviews.length})</span> : null}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-semibold">{title}</h3>
        <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <Users className="size-4 shrink-0" />
            Up to {maxCapacity} people
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <p>
            <span className="font-heading text-2xl font-bold text-primary">{formatMoney(hourlyRate)}</span>
            <span className="text-sm text-muted-foreground"> / hr</span>
          </p>
          <Link
            href={`/studios/${_id}`}
            className={buttonVariants({ size: "sm", className: "rounded-full px-4" })}
          >
            View Details
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function StudioCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="aspect-[4/3] animate-pulse bg-muted" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        <div className="flex justify-between pt-3">
          <div className="h-7 w-20 animate-pulse rounded bg-muted" />
          <div className="h-8 w-28 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
