"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { authClient, useSession } from "@/lib/auth-client";
import { uploadImage } from "@/lib/uploadImage";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function ProfileDetails() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setImage(session.user.image ?? "");
    }
  }, [session?.user]);

  if (isPending || !session) {
    return <Skeleton className="h-80 rounded-3xl" />;
  }

  const user = session.user;
  const changed = name.trim() !== (user.name ?? "") || image.trim() !== (user.image ?? "");

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file");
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setImage(url);
      toast.success("Photo uploaded. Press Save changes to keep it.");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("Name must be at least 2 characters");
    setSaving(true);
    const toastId = toast.loading("Saving your profile...");
    const { error } = await authClient.updateUser({ name: name.trim(), image: image.trim() || null });
    if (error) {
      toast.error(error.message || "Could not update your profile", { id: toastId });
    } else {
      await refetch();
      router.refresh();
      toast.success("Profile updated", { id: toastId });
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold">Profile details</h2>

      <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative size-28 shrink-0">
          <div className="size-28 overflow-hidden rounded-full border-4 border-background bg-primary/10 shadow-lg ring-2 ring-primary/30">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name} referrerPolicy="no-referrer" className="size-full object-cover" />
            ) : (
              <span className="flex size-full items-center justify-center font-heading text-3xl font-bold text-primary">
                {getInitials(name || user.name)}
              </span>
            )}
          </div>
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white">
              <Spinner className="size-6" />
            </div>
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="absolute right-0 bottom-0 flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:scale-105"
            aria-label="Change profile photo"
          >
            <Camera className="size-4" />
          </button>
        </div>
        <div className="min-w-0 text-center sm:text-left">
          <p className="truncate text-lg font-semibold">{user.name}</p>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? <Spinner /> : <Camera />} {uploading ? "Uploading..." : "Upload new photo"}
            </Button>
            {image && (
              <Button type="button" variant="ghost" size="sm" onClick={() => setImage("")}>
                <Trash2 /> Remove
              </Button>
            )}
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
      </div>

      <FieldGroup className="mt-8">
        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field>
          <FieldLabel htmlFor="photo">Photo link (optional)</FieldLabel>
          <Input id="photo" type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://i.ibb.co/your-photo.jpg" />
          <FieldDescription>Upload a photo above, or paste a link here.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" value={user.email} disabled />
          <FieldDescription>Email can&apos;t be changed.</FieldDescription>
        </Field>
      </FieldGroup>

      <div className="mt-6 flex justify-end">
        <Button type="submit" size="lg" className="rounded-full px-6" disabled={!changed || saving || uploading}>
          {saving ? <Spinner /> : <Save />} {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
