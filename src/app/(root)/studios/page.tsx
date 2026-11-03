import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import StudioCard, { StudioCardSkeleton } from "@/components/shared/StudioCard";
import { TStudio } from "@/types/studio.types";
import FilterBar from "./_components/FilterBar";

export const metadata: Metadata = { title: "Explore Studios | StudioSpace" };

type SearchParams = { category?: string; search?: string; sort?: string };

async function StudioResults({ params }: { params: SearchParams }) {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.search) query.set("search", params.search);
  if (params.sort) query.set("sort", params.sort);

  let studios: TStudio[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios?${query.toString()}`, { cache: "no-store" });
    studios = res.ok ? await res.json() : [];
  } catch {
    studios = [];
  }

  if (studios.length === 0) {
    return (
      <Empty className="mt-10 border bg-card">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle className="text-lg">No studios match your search</EmptyTitle>
          <EmptyDescription>Try another category or a different keyword. New spaces are added every week.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Link href="/studios" className={buttonVariants({ className: "rounded-full" })}>
            Clear filters
          </Link>
          <Link href="/add-studio" className={buttonVariants({ variant: "outline", className: "rounded-full" })}>
            Host a studio
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <>
      <p className="mt-8 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{studios.length}</span>{" "}
        {studios.length === 1 ? "studio" : "studios"}
        {params.category ? ` in ${params.category}` : ""}
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio) => (
          <StudioCard key={studio._id} studio={studio} />
        ))}
      </div>
    </>
  );
}

export default async function ExploreStudiosPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Explore Studios</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Find a creative workspace by the hour. Filter by category, search by area and sort by price or rating.
        </p>
      </div>

      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>

      <Suspense
        key={JSON.stringify(params)}
        fallback={
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <StudioCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <StudioResults params={params} />
      </Suspense>
    </section>
  );
}
