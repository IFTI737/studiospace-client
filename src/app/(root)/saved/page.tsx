import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import PageHeader from "@/components/shared/PageHeader";
import StudioCard from "@/components/shared/StudioCard";
import { getSessionUser, serverFetch } from "@/lib/serverApi";
import { TStudio } from "@/types/studio.types";

export const metadata: Metadata = { title: "Saved Studios | StudioSpace" };

export default async function SavedStudiosPage() {
  const user = await getSessionUser();
  const studios = (await serverFetch<TStudio[]>(`/wishlist/${encodeURIComponent(user?.email ?? "")}`)) ?? [];

  return (
    <section className="container mx-auto px-4 py-12">
      <PageHeader eyebrow="Wishlist" title="Saved Studios" description="Spaces you marked with a heart, all in one place." />

      {studios.length === 0 ? (
        <Empty className="border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon"><Heart /></EmptyMedia>
            <EmptyTitle className="text-lg">Nothing saved yet</EmptyTitle>
            <EmptyDescription>Tap the heart on any studio card to keep it here for later.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/studios" className={buttonVariants({ className: "rounded-full" })}>
              <Search /> Explore Studios
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} saved />
          ))}
        </div>
      )}
    </section>
  );
}
