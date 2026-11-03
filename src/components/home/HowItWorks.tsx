import { CalendarClock, Clapperboard, Search, Zap } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  { icon: Search, title: "Discover Spaces", text: "Filter by category, price and location to find a studio that fits your idea." },
  { icon: CalendarClock, title: "Select Shoot Hours", text: "Pick your date, start time and how many hours you need. The price updates live." },
  { icon: Zap, title: "Book Instantly", text: "Send your request in one click. We check the calendar so no slot is double-booked." },
  { icon: Clapperboard, title: "Create & Produce", text: "Show up, set up and make your best work. Leave a review for the next creator." },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="How Booking Works"
          title="From idea to shoot day in 4 steps"
          description="No phone calls, no guesswork. Just clear prices and real-time availability."
        />
        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden className="absolute top-10 right-[12%] left-[12%] hidden h-px border-t-2 border-dashed border-primary/30 lg:block" />
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="group relative rounded-2xl border bg-card p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
              <span className="relative mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-8" />
                <span className="absolute -top-1 -right-1 flex size-7 items-center justify-center rounded-full bg-foreground font-heading text-sm font-bold text-background">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
