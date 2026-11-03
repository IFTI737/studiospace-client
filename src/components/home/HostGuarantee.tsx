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
      <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1 text-xs font-semibold tracking-widest text-spotlight uppercase">
            Host Guarantee & Creator Support
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Share your space with confidence. Create without worry.
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
          {promises.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-background/10">
              <Icon className="size-8 text-spotlight" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-background/70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
