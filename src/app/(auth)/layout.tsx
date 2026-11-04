import Image from "next/image";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-10 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm animate-fade-up">{children}</div>
        </div>
      </div>

      <div className="relative isolate hidden overflow-hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80"
          alt="Camera in a creative studio"
          fill
          unoptimized
          priority
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        <div aria-hidden className="pointer-events-none absolute inset-10">
          <span className="absolute top-0 left-0 size-8 border-t-2 border-l-2 border-white/60" />
          <span className="absolute top-0 right-0 size-8 border-t-2 border-r-2 border-white/60" />
          <span className="absolute bottom-0 left-0 size-8 border-b-2 border-l-2 border-white/60" />
          <span className="absolute right-0 bottom-0 size-8 border-r-2 border-b-2 border-white/60" />
        </div>
        <div className="absolute inset-x-14 top-14 flex justify-between font-mono text-[11px] tracking-[0.2em] text-white/75 uppercase">
          <span className="flex items-center gap-2"><span className="rec-dot size-2 rounded-full bg-red-500" /> Rec</span>
          <span>Cam 01 · StudioSpace</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-14 text-white">
          <span className="mb-4 inline-block rounded-full bg-primary/25 px-3 py-1 font-mono text-xs tracking-[0.18em] text-spotlight uppercase ring-1 ring-primary/40">
            Book. Create. Repeat.
          </span>
          <h2 className="text-4xl font-bold tracking-tight">Every great project starts in the right room.</h2>
          <p className="mt-3 max-w-md text-white/75">
            Photo studios, sound stages, podcast lounges and music suites, ready by the hour.
          </p>
        </div>
      </div>
    </div>
  );
}
