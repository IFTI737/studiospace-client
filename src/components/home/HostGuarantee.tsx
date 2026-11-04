import Link from "next/link";
import { BadgeCheck, Headphones, ShieldCheck, Wrench } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const promises = [
  { icon: ShieldCheck, title: "Liability Protection", text: "Every confirmed booking is covered up to $10,000 for accidental damage to the space." },
  { icon: BadgeCheck, title: "Verified Profiles", text: "Hosts and creators sign in with a verified account, so you always know who you work with." },
  { icon: Wrench, title: "Equipment Safety", text: "Hosts list the gear in each room, and the security deposit keeps lights and mics safe." },
  { icon: Headphones, title: "24/7 Host Support", text: "Our support team is online day and night to help hosts and creators sort things out fast." },
];

export default function HostGuarantee() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 text-background">
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 size-[30rem] rounded-full bg-primary/30 blur-3xl" />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-40 invert" />
      <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
        <div data-reveal>
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-spotlight uppercase">
            <span className="text-background/50">(04)</span>
            <span className="h-px w-8 bg-spotlight/60" />
            Host Guarantee & Creator Support
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            Share your space with confidence. <span className="text-primary">Create without worry.</span>
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-background/70">
            We built StudioSpace so both sides feel safe. Hosts get protection and steady bookings,
            and creators get rooms that look exactly like the photos.
          </p>
          <Link href="/add-studio" className={buttonVariants({ size: "lg", className: "mt-8 h-12 rounded-full px-7 text-base" })}>
            Become a Host
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {promises.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              data-reveal
              style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
              className="group rounded-3xl border border-background/10 bg-background/[0.04] p-6 transition-[translate,border-color,background-color] duration-500 hover:-translate-y-1 hover:border-primary/60 hover:bg-background/[0.08]"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-spotlight transition duration-500 group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-background/70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
