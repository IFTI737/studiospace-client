import Link from "next/link";
import { ArrowUpRight, MapPin, Star, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatMoney } from "@/lib/constants";
import { TStudio } from "@/types/studio.types";
import SafeImage from "./SafeImage";
import SaveButton from "./SaveButton";

export default function StudioCard({ studio, saved, index = 0 }: { studio: TStudio; saved?: boolean; index?: number }) {
  const { _id, title, category, image, location, hourlyRate, rating, maxCapacity, reviews } = studio;

  return (
    <article
      data-reveal
      style={{ "--d": `${(index % 3) * 90}ms` } as React.CSSProperties}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-[translate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_30px_60px_-28px] hover:shadow-primary/45"
    >
      <Link href={`/studios/${_id}`} data-cursor="VIEW" aria-label={`View ${title}`} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <SafeImage src={image} alt={title} className="transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.07]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-black/55 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-white uppercase">
          {category}
        </span>
        <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-900">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          {rating ? rating.toFixed(1) : "New"}
          {reviews?.length ? <span className="font-normal text-neutral-500">({reviews.length})</span> : null}
        </span>
        <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-white/95 text-neutral-900 transition duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
      <SaveButton studioId={_id} initialSaved={saved} className="absolute top-3 right-3" />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 font-heading text-xl font-bold tracking-tight">
          <Link href={`/studios/${_id}`} className="transition-colors hover:text-primary">
            {title}
          </Link>
        </h3>
        <div className="mt-2 mb-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <p className="flex min-w-0 items-center gap-1.5">
            <MapPin className="size-4 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <Users className="size-4 shrink-0" />
            Up to {maxCapacity}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-dashed pt-4">
          <p>
            <span className="font-heading text-2xl font-bold">{formatMoney(hourlyRate)}</span>
            <span className="font-mono text-xs text-muted-foreground"> / HR</span>
          </p>
          <Link
            href={`/studios/${_id}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-semibold text-background transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            View Details
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function StudioCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border bg-card">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between border-t border-dashed pt-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}
