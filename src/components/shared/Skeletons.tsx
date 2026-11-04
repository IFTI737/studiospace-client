import { Skeleton } from "@/components/ui/skeleton";
import { StudioCardSkeleton } from "./StudioCard";

// Page-shaped skeletons so every route loads into its own layout, not a spinner.

export function PageHeaderSkeleton({ action = false }: { action?: boolean }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-dashed pb-8">
      <div className="space-y-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-11 w-64 sm:w-80" />
        <Skeleton className="h-4 w-56 sm:w-96" />
      </div>
      {action && <Skeleton className="h-11 w-40 rounded-full" />}
    </div>
  );
}

export function StudioGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <StudioCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <>
      <div className="relative h-[82vh] min-h-[560px] bg-neutral-900">
        <div className="container mx-auto flex h-full flex-col justify-center gap-5 px-4">
          <Skeleton className="h-6 w-56 rounded-full bg-white/10" />
          <Skeleton className="h-14 w-full max-w-2xl bg-white/10" />
          <Skeleton className="h-14 w-3/4 max-w-xl bg-white/10" />
          <Skeleton className="h-5 w-full max-w-lg bg-white/10" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="h-14 w-52 rounded-full bg-white/10" />
            <Skeleton className="h-14 w-44 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
      <div className="h-16 border-y bg-foreground/90" />
      <section className="container mx-auto px-4 py-24">
        <div className="mb-10 space-y-3">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-12 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-sm" />
        </div>
        <StudioGridSkeleton />
      </section>
    </>
  );
}

export function StudioDetailsSkeleton() {
  return (
    <section className="container mx-auto px-4 py-10">
      <Skeleton className="h-8 w-32 rounded-full" />
      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <Skeleton className="aspect-[4/3] rounded-3xl sm:aspect-[16/10]" />
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-10 w-2/3" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="space-y-2 border-t pt-8">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border bg-card p-6">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </section>
  );
}

export function BookingListSkeleton() {
  return (
    <section className="container mx-auto px-4 py-12">
      <PageHeaderSkeleton action />
      <div className="grid gap-5 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-2xl border bg-card sm:flex-row">
            <Skeleton className="aspect-[16/10] rounded-none sm:aspect-auto sm:h-auto sm:w-44" />
            <div className="flex-1 space-y-3 p-5">
              <div className="flex justify-between gap-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-4 w-3/5" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-9 w-28 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ListingRowsSkeleton() {
  return (
    <section className="container mx-auto px-4 py-12">
      <PageHeaderSkeleton action />
      <div className="grid gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-2xl border bg-card sm:flex-row">
            <Skeleton className="aspect-[16/10] rounded-none sm:aspect-auto sm:h-36 sm:w-64" />
            <div className="flex flex-1 flex-col gap-4 p-5 md:flex-row md:items-center">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DashboardSkeleton() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center gap-5 rounded-3xl bg-foreground p-8">
        <Skeleton className="size-16 rounded-full bg-background/15" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24 bg-background/15" />
          <Skeleton className="h-8 w-56 bg-background/15" />
          <Skeleton className="h-4 w-44 bg-background/15" />
        </div>
        <Skeleton className="h-10 w-40 rounded-full bg-background/15" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-2xl border bg-card p-5">
            <Skeleton className="size-10 rounded-xl" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>
      <div className="mt-10 space-y-2">
        <Skeleton className="h-7 w-72" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="mt-5 space-y-3 rounded-2xl border bg-card p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </section>
  );
}

export function FormSkeleton() {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 space-y-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-11 w-72" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="space-y-6 rounded-3xl border bg-card p-6 sm:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-[1fr_160px]">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="aspect-[4/3] rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-28 w-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        <Skeleton className="ml-auto h-11 w-44 rounded-full" />
      </div>
    </section>
  );
}

export function ProfileSkeleton() {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-11 w-56" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="space-y-8">
        <div className="rounded-3xl border bg-card p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <Skeleton className="size-28 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-52" />
              <Skeleton className="h-8 w-36 rounded-full" />
            </div>
          </div>
          <div className="mt-8 space-y-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
        <Skeleton className="h-72 rounded-3xl" />
      </div>
    </section>
  );
}

export function ContentPageSkeleton() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-12 w-full max-w-md" />
          <Skeleton className="h-12 w-3/4 max-w-sm" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-12 w-44 rounded-full" />
        </div>
        <Skeleton className="aspect-[4/3] rounded-3xl" />
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-3xl border bg-card p-6">
            <Skeleton className="size-12 rounded-2xl" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function AuthFormSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-full rounded-full" />
      <Skeleton className="h-10 w-full rounded-full" />
    </div>
  );
}
