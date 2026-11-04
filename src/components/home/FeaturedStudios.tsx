import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import StudioCard, { StudioCardSkeleton } from "@/components/shared/StudioCard";
import { TStudio } from "@/types/studio.types";
import SectionHeading from "./SectionHeading";

async function FeaturedList() {
  let studios: TStudio[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-studios`, { cache: "no-store" });
    if (!res.ok) throw new Error();
    studios = await res.json();
  } catch {
    return (
      <p className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
        Featured studios are unavailable right now. Please refresh in a moment.
      </p>
    );
  }

  if (studios.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center">
        <p className="text-muted-foreground">No studios listed yet. Be the first host on StudioSpace!</p>
        <Link href="/add-studio" className={buttonVariants({ className: "mt-4 rounded-full" })}>
          Host Your Space
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((studio, i) => (
        <StudioCard key={studio._id} studio={studio} index={i} />
      ))}
    </div>
  );
}

export default function FeaturedStudios() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="left"
            className="mb-10"
            index="01"
            eyebrow="Featured Studios"
            title="Top-rated spaces creators love"
            description="Hand-picked studios with great reviews, clear pricing and hosts who reply fast."
          />
          <Link href="/studios" className={buttonVariants({ variant: "outline", size: "lg", className: "mb-10 rounded-full px-5" })}>
            View all studios <ArrowRight />
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <StudioCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <FeaturedList />
        </Suspense>
      </div>
    </section>
  );
}
