import { Skeleton } from "@/components/ui/skeleton";
import { StudioGridSkeleton } from "@/components/shared/Skeletons";

export default function StudiosLoading() {
  return (
    <section className="container mx-auto px-4 py-12">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="mt-4 h-16 w-80 max-w-full" />
      <Skeleton className="mt-4 h-4 w-96 max-w-full" />
      <div className="mt-8 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-full" />
        ))}
      </div>
      <Skeleton className="mt-4 h-12 rounded-full" />
      <div className="mt-10">
        <StudioGridSkeleton />
      </div>
    </section>
  );
}
