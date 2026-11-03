import { StudioCardSkeleton } from "@/components/shared/StudioCard";

export default function StudiosLoading() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="h-12 w-72 animate-pulse rounded-lg bg-muted" />
      <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
      <div className="mt-8 h-11 animate-pulse rounded-full bg-muted" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <StudioCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
