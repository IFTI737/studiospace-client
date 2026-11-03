import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Eye, MapPin, Pencil, PlusCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import PageHeader from "@/components/shared/PageHeader";
import SafeImage from "@/components/shared/SafeImage";
import { getSessionUser, serverFetch } from "@/lib/serverApi";
import { formatMoney } from "@/lib/constants";
import { TStudio } from "@/types/studio.types";
import DeleteStudioButton from "./_components/DeleteStudioButton";

export const metadata: Metadata = { title: "My Studio Listings | StudioSpace" };

export default async function MyListingsPage() {
  const user = await getSessionUser();
  const studios = (await serverFetch<TStudio[]>(`/my-listings/${encodeURIComponent(user?.email ?? "")}`)) ?? [];

  return (
    <section className="container mx-auto px-4 py-12">
      <PageHeader
        eyebrow="Host"
        title="My Studio Listings"
        description={studios.length ? `You have ${studios.length} studio${studios.length > 1 ? "s" : ""} listed.` : "Manage the spaces you host."}
      >
        <Link href="/add-studio" className={buttonVariants({ size: "lg", className: "rounded-full" })}>
          <PlusCircle /> Add New Studio
        </Link>
      </PageHeader>

      {studios.length === 0 ? (
        <Empty className="border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon"><Building2 /></EmptyMedia>
            <EmptyTitle className="text-lg">No studios listed yet</EmptyTitle>
            <EmptyDescription>List your first space and start earning from the hours it sits empty.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/add-studio" className={buttonVariants({ className: "rounded-full" })}>
              <PlusCircle /> Host Your Space
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-5">
          {studios.map((studio) => (
            <article key={studio._id} className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md sm:flex-row">
              <div className="relative aspect-[16/10] shrink-0 bg-muted sm:aspect-auto sm:w-64">
                <SafeImage src={studio.image} alt={studio.title} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 md:flex-row md:items-center">
                <div className="min-w-0 flex-1">
                  <Badge variant="secondary">{studio.category}</Badge>
                  <h2 className="mt-2 text-xl font-semibold">{studio.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="size-4" /> {studio.location}</span>
                    <span className="flex items-center gap-1"><Star className="size-4 fill-amber-400 text-amber-400" /> {studio.rating ? studio.rating.toFixed(1) : "New"}</span>
                    <span className="font-semibold text-primary">{formatMoney(studio.hourlyRate)} / hr</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/studios/${studio._id}`} className={buttonVariants({ variant: "ghost", size: "sm", className: "rounded-full" })}>
                    <Eye /> View
                  </Link>
                  <Link href={`/studios/edit/${studio._id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "rounded-full" })}>
                    <Pencil /> Update
                  </Link>
                  <DeleteStudioButton id={studio._id} title={studio.title} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
