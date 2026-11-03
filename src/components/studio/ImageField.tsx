"use client";

import { useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import SafeImage from "@/components/shared/SafeImage";
import { uploadImage } from "@/lib/uploadImage";

// Cover image: paste a URL or upload to imgbb
export function CoverImageField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
      <div className="space-y-2">
        <Input id="image" type="url" value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://i.ibb.co/studio.jpg" required />
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
        <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? <Spinner /> : <Upload />} {uploading ? "Uploading..." : "Upload from device (imgbb)"}
        </Button>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted">
        {value ? <SafeImage src={value} alt="Cover preview" /> : (
          <div className="flex h-full items-center justify-center text-muted-foreground"><ImagePlus className="size-7" /></div>
        )}
      </div>
    </div>
  );
}

// Extra gallery images (up to 4), uploaded to imgbb
export function GalleryField({ value, onChange }: { value: string[]; onChange: (urls: string[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const room = 4 - value.length;
    if (room <= 0) return toast.info("You can add up to 4 gallery photos");
    setUploading(true);
    try {
      const urls = await Promise.all(Array.from(files).slice(0, room).map(uploadImage));
      onChange([...value, ...urls]);
      toast.success(`${urls.length} photo${urls.length > 1 ? "s" : ""} added`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {value.map((url, i) => (
        <div key={url + i} className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
          <SafeImage src={url} alt={`Gallery ${i + 1}`} />
          <button
            type="button"
            aria-label="Remove photo"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="absolute top-1.5 right-1.5 rounded-full bg-background/90 p-1 shadow transition hover:scale-110"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
      {value.length < 4 && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed text-xs text-muted-foreground transition hover:border-primary hover:text-primary"
        >
          {uploading ? <Spinner /> : <ImagePlus className="size-5" />}
          {uploading ? "Uploading" : "Add photos"}
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
    </div>
  );
}
