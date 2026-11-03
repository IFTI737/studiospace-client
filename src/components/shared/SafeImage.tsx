"use client";

import { useState } from "react";
import Image from "next/image";
import { Aperture } from "lucide-react";
import { cn } from "cn";

// Image URLs come from users (imgbb, postimage, etc.), so we skip the optimizer
// and show a branded placeholder if the link is broken.
export default function SafeImage({
  src,
  alt,
  className,
  priority,
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={cn("absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/30 via-accent to-secondary", className)}>
        <Aperture className="size-10 text-primary/70" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
