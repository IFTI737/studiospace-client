import { PageHeaderSkeleton, StudioGridSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <section className="container mx-auto px-4 py-12">
      <PageHeaderSkeleton action />
      <StudioGridSkeleton />
    </section>
  );
}
