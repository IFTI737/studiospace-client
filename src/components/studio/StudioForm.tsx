"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { amenityOptions, categoryNames } from "@/lib/constants";
import { TStudio } from "@/types/studio.types";
import { CoverImageField, GalleryField } from "./ImageField";

type Props = { mode: "add" | "edit"; studio?: TStudio };

export default function StudioForm({ mode, studio }: Props) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [image, setImage] = useState(studio?.image ?? "");
  const [gallery, setGallery] = useState<string[]>(studio?.gallery ?? []);
  const [amenities, setAmenities] = useState<string[]>(studio?.amenities ?? []);
  const [submitting, setSubmitting] = useState(false);

  const toggleAmenity = (item: string) =>
    setAmenities((current) => (current.includes(item) ? current.filter((a) => a !== item) : [...current, item]));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amenities.length === 0) return toast.error("Please pick at least one amenity");

    const formData = new FormData(e.currentTarget);
    const body = {
      title: formData.get("title"),
      category: formData.get("category"),
      hourlyRate: formData.get("hourlyRate"),
      securityDeposit: formData.get("securityDeposit"),
      maxCapacity: formData.get("maxCapacity"),
      location: formData.get("location"),
      overview: formData.get("overview"),
      image,
      gallery,
      amenities,
    };

    setSubmitting(true);
    const toastId = toast.loading(mode === "add" ? "Publishing your studio..." : "Saving your changes...", {
      description: "Please wait. This can take a few seconds on a slow connection.",
    });
    try {
      if (mode === "add") {
        await apiFetch("/studios", { method: "POST", body });
        toast.success("Your studio is live on StudioSpace!", { id: toastId, description: undefined });
      } else {
        await apiFetch(`/studios/${studio!._id}`, { method: "PATCH", body });
        toast.success("Studio updated successfully", { id: toastId, description: undefined });
      }
      router.push("/my-listings");
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message, { id: toastId, description: undefined });
      setSubmitting(false);
    }
  };

  const hostName = studio?.ownerName ?? session?.user.name ?? "";
  const hostEmail = studio?.ownerEmail ?? session?.user.email ?? "";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-xl font-bold">Studio basics</h2>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" name="title" defaultValue={studio?.title} placeholder="e.g. Northlight Cyc Wall Studio" required />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <NativeSelect id="category" name="category" defaultValue={studio?.category ?? ""} className="w-full" required>
                <NativeSelectOption value="" disabled>Select a category</NativeSelectOption>
                {categoryNames.map((c) => (
                  <NativeSelectOption key={c} value={c}>{c}</NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="location">Location / Address</FieldLabel>
              <Input id="location" name="location" defaultValue={studio?.location} placeholder="e.g. House 12, Road 5, Banani, Dhaka" required />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="hourlyRate">Hourly Rate ($)</FieldLabel>
              <Input id="hourlyRate" name="hourlyRate" type="number" min={1} defaultValue={studio?.hourlyRate} placeholder="45" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="securityDeposit">Security Deposit ($)</FieldLabel>
              <Input id="securityDeposit" name="securityDeposit" type="number" min={0} defaultValue={studio?.securityDeposit} placeholder="100" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="maxCapacity">Max Capacity</FieldLabel>
              <Input id="maxCapacity" name="maxCapacity" type="number" min={1} defaultValue={studio?.maxCapacity} placeholder="8" required />
            </Field>
          </div>
        </FieldGroup>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-xl font-bold">Photos</h2>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="image">Cover Image URL</FieldLabel>
            <CoverImageField value={image} onChange={setImage} />
          </Field>
          <Field>
            <FieldLabel>Gallery (optional)</FieldLabel>
            <GalleryField value={gallery} onChange={setGallery} />
            <FieldDescription>Add up to 4 more photos. They show in the details page carousel.</FieldDescription>
          </Field>
        </FieldGroup>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="mb-2 text-xl font-bold">Amenities</h2>
        <p className="mb-5 text-sm text-muted-foreground">Tick everything creators can use in your space.</p>
        <div className="flex flex-wrap gap-2">
          {amenityOptions.map((item) => {
            const checked = amenities.includes(item);
            return (
              <label
                key={item}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition select-none",
                  checked ? "border-primary bg-primary/10 text-primary" : "hover:border-primary/50",
                )}
              >
                <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleAmenity(item)} />
                <Check className={cn("size-3.5 transition", checked ? "opacity-100" : "opacity-0 -ml-5")} />
                {item}
              </label>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-xl font-bold">Details & host</h2>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="overview">Detailed Overview</FieldLabel>
            <Textarea
              id="overview"
              name="overview"
              rows={6}
              defaultValue={studio?.overview}
              placeholder="Size of the room, gear included, lighting, parking, house rules..."
              className="min-h-32"
              required
            />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="hostName">Host Name</FieldLabel>
              <Input id="hostName" value={isPending ? "Loading..." : hostName} readOnly className="bg-muted" />
            </Field>
            <Field>
              <FieldLabel htmlFor="hostEmail">Host Email</FieldLabel>
              <Input id="hostEmail" value={isPending ? "Loading..." : hostEmail} readOnly className="bg-muted" />
            </Field>
          </div>
        </FieldGroup>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" size="lg" className="rounded-full" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" size="lg" className="rounded-full px-8" disabled={submitting}>
          {submitting ? <Spinner /> : mode === "add" ? <Sparkles /> : <Save />}
          {submitting ? "Saving..." : mode === "add" ? "Publish Studio" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
