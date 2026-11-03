export default function StudioDetailsLoading() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="h-8 w-32 animate-pulse rounded-full bg-muted" />
      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="aspect-[16/10] animate-pulse rounded-3xl bg-muted" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-24 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-72 animate-pulse rounded-3xl bg-muted" />
      </div>
    </section>
  );
}
