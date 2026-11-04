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
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          index="03"
          eyebrow="How Booking Works"
          title="From idea to shoot day in 4 steps"
          description="No phone calls, no guesswork. Just clear prices and real-time availability."
        />
        <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              data-reveal
              style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
              className="group relative overflow-hidden rounded-3xl border bg-card p-7 transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_30px_60px_-30px] hover:shadow-primary/40"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-4 -right-1 font-heading text-8xl font-extrabold text-outline text-primary/20 transition-colors duration-500 group-hover:text-primary/45"
              >
                0{i + 1}
              </span>
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition duration-500 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </span>
              <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">Step 0{i + 1}</p>
              <h3 className="mt-1 text-xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <span className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
