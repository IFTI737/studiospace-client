import { Aperture } from "lucide-react";

// Branded loader: a spinning aperture with a soft glow
export default function BrandLoader({ label = "Setting up the studio..." }: { label?: string }) {
  return (
    <div role="status" className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
        <span className="relative flex size-16 items-center justify-center rounded-full bg-foreground text-background shadow-xl">
          <Aperture className="size-8 animate-spin [animation-duration:2.5s]" />
        </span>
      </div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
