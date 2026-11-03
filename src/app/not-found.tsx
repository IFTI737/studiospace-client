import Link from "next/link";
import { Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <div className="absolute top-6 left-6"><Logo /></div>
      <div aria-hidden className="pointer-events-none absolute top-1/4 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-spotlight/20 blur-3xl" />

      {/* Studio illustration: a spotlight shining on an empty set with a camera */}
      <svg viewBox="0 0 400 260" className="relative w-full max-w-md animate-float" role="img" aria-label="An empty studio set under a spotlight">
        <defs>
          <linearGradient id="beam" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--spotlight)" stopOpacity="0.85" />
            <stop offset="1" stopColor="var(--spotlight)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="190,30 120,230 280,230 210,30" fill="url(#beam)" />
        <rect x="178" y="14" width="44" height="24" rx="6" className="fill-foreground" />
        <line x1="200" y1="0" x2="200" y2="14" className="stroke-foreground" strokeWidth="4" />
        <ellipse cx="200" cy="232" rx="110" ry="12" className="fill-foreground/10" />
        <text x="200" y="190" textAnchor="middle" className="fill-foreground font-heading" fontSize="72" fontWeight="800">404</text>
        {/* camera on tripod */}
        <g transform="translate(300 120)">
          <rect x="0" y="0" width="54" height="34" rx="6" className="fill-primary" />
          <circle cx="27" cy="17" r="10" className="fill-background" />
          <circle cx="27" cy="17" r="5" className="fill-foreground" />
          <rect x="54" y="8" width="14" height="18" rx="3" className="fill-primary" />
          <line x1="27" y1="34" x2="10" y2="110" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
          <line x1="27" y1="34" x2="44" y2="110" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
          <line x1="27" y1="34" x2="27" y2="110" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
        </g>
        {/* light stand */}
        <g transform="translate(40 110)">
          <rect x="0" y="0" width="40" height="28" rx="4" className="fill-foreground" />
          <rect x="6" y="5" width="28" height="18" rx="2" className="fill-spotlight" />
          <line x1="20" y1="28" x2="20" y2="120" className="stroke-foreground" strokeWidth="4" />
          <line x1="20" y1="120" x2="2" y2="122" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
          <line x1="20" y1="120" x2="38" y2="122" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>

      <h1 className="relative mt-6 text-3xl font-bold tracking-tight sm:text-4xl">This set is empty</h1>
      <p className="relative mt-3 max-w-md text-muted-foreground">
        The page you are looking for has wrapped up and left the studio. Let&apos;s get you back to the main stage.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg", className: "relative mt-8 h-12 rounded-full px-7 text-base" })}>
        <Home /> Return to Home
      </Link>
    </main>
  );
}
