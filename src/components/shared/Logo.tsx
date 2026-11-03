import Link from "next/link";
import { Aperture } from "lucide-react";
import { cn } from "cn";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2 font-heading text-xl font-bold tracking-tight", className)}
    >
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
        <span className="absolute inset-0 rounded-xl bg-primary opacity-0 blur-md transition-opacity group-hover:opacity-60" />
        <Aperture className="relative size-5 transition-transform duration-700 group-hover:rotate-180" />
      </span>
      Studio<span className="text-primary">Space</span>
    </Link>
  );
}
