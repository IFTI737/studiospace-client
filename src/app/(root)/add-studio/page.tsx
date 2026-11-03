import type { Metadata } from "next";
import StudioForm from "@/components/studio/StudioForm";

export const metadata: Metadata = { title: "Add New Studio | StudioSpace" };

export default function AddStudioPage() {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">Host your space</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Add a New Studio</h1>
        <p className="mt-3 text-muted-foreground">Fill in the details below. Your studio goes live as soon as you publish.</p>
      </div>
      <StudioForm mode="add" />
    </section>
  );
}
