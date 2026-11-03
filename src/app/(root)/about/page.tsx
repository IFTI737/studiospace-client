import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Camera, HeartHandshake, Leaf, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "About Us | StudioSpace" };

const values = [
  { icon: Users, title: "Creators first", text: "Clear prices, honest photos and real reviews so you book with confidence." },
  { icon: HeartHandshake, title: "Fair for hosts", text: "Hosts set their own rates and approve every booking themselves." },
  { icon: Leaf, title: "Use what exists", text: "Thousands of studios sit empty most of the week. Sharing them helps everyone." },
  { icon: Camera, title: "Made by creators", text: "We are photographers, podcasters and musicians who were tired of hunting for rooms." },
];

const numbers = [
  { value: "5", label: "Studio categories" },
  { value: "24/7", label: "Host support" },
  { value: "1 hr", label: "Minimum booking" },
  { value: "0", label: "Double bookings" },
];

export default function AboutPage() {
  return (
    <>
      <section className="container mx-auto grid items-center gap-12 px-4 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">About Us</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">We help creators find the right room.</h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            StudioSpace started with a simple problem: great studios were hard to find and even harder to book.
            Today we connect creators with hosts across the city, from cyc wall photo studios to sound stages,
            podcast lounges, music suites and art workshops.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Every booking is checked against the calendar, every host is verified, and every price is shown up front.
          </p>
          <Link href="/studios" className={buttonVariants({ size: "lg", className: "mt-8 rounded-full px-7" })}>
            Explore Studios
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80"
            alt="Music studio with instruments"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y bg-muted/50">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.label} className="text-center">
              <p className="font-heading text-4xl font-extrabold text-primary">{n.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center text-3xl font-bold">What we believe</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <Icon className="size-8 text-primary" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
