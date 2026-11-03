import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import HowItWorks from "@/components/home/HowItWorks";
import HostGuarantee from "@/components/home/HostGuarantee";

export const metadata: Metadata = { title: "How It Works | StudioSpace" };

const hostSteps = [
  { title: "List your space", text: "Add photos, amenities, an hourly rate and a security deposit in a few minutes." },
  { title: "Review requests", text: "Every booking arrives as Pending. Confirm the ones that fit your calendar." },
  { title: "Host and get paid", text: "Welcome creators, mark the session completed and collect great reviews." },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="container mx-auto px-4 pt-14 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">How StudioSpace works</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          A simple marketplace for two kinds of people: creators who need a room, and hosts who have one.
        </p>
      </section>
      <HowItWorks />

      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-center text-3xl font-bold">For hosts</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {hostSteps.map((step, i) => (
            <div key={step.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <span className="font-heading text-5xl font-extrabold text-primary/25">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/studios" className={buttonVariants({ size: "lg", className: "rounded-full px-7" })}>
            Start exploring <ArrowRight />
          </Link>
        </div>
      </section>
      <HostGuarantee />
    </>
  );
}
