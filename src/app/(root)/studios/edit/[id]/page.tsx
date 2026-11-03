import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import StudioForm from "@/components/studio/StudioForm";
import { auth } from "@/lib/auth";
import { TStudio } from "@/types/studio.types";

export const metadata: Metadata = { title: "Update Studio | StudioSpace" };

export default async function EditStudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`, { cache: "no-store" }).catch(() => null);
  if (!res?.ok) notFound();
  const studio: TStudio = await res.json();

  if (studio.ownerEmail !== session?.user.email) {
    return (
      <section className="container mx-auto max-w-lg px-4 py-24 text-center">
        <ShieldAlert className="mx-auto size-12 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold">You can only edit your own studios</h1>
        <Link href="/my-listings" className={buttonVariants({ className: "mt-6 rounded-full" })}>
          Go to My Listings
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">Edit listing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Update Studio</h1>
        <p className="mt-3 text-muted-foreground">Change anything you like. Host details stay the same.</p>
      </div>
      <StudioForm mode="edit" studio={studio} />
    </section>
  );
}
