import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

// fanned like a hand of cards on desktop, swipeable row on phones
const fan = [
  { rot: "-9deg", y: "28px" },
  { rot: "-4deg", y: "6px" },
  { rot: "0deg", y: "-4px" },
  { rot: "4deg", y: "6px" },
  { rot: "9deg", y: "28px" },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-muted/50 py-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div className="container relative mx-auto px-4">
        <SectionHeading
          index="02"
          eyebrow="Browse by Category"
          title="What are you creating today?"
          description="Hover a card to pull it out of the deck. Pick a type of space and we show every studio that fits."
        />
        <div
          data-reveal
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-8 lg:mx-0 lg:justify-center lg:gap-0 lg:overflow-visible lg:px-0 lg:pt-10 lg:pb-16"
        >
          {categories.map(({ name, label, icon: Icon, image, blurb }, i) => (
            <Link
              key={name}
              href={`/studios?category=${encodeURIComponent(name)}`}
              data-cursor="OPEN"
              style={{ "--rot": fan[i % fan.length].rot, "--y": fan[i % fan.length].y } as React.CSSProperties}
              className="deck-card group relative flex aspect-[3/4] w-[min(72vw,260px)] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[1.6rem] bg-neutral-900 p-5 text-white shadow-[0_24px_50px_-28px_rgba(0,0,0,0.6)] ring-1 ring-primary/30 lg:-mx-3 lg:w-[230px] xl:w-[250px]"
            >
              <Image
                src={image}
                alt={label}
                fill
                unoptimized
                sizes="260px"
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase">
                  <Icon className="size-3.5 text-spotlight" /> 0{i + 1}
                </span>
                <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              <div className="relative">
                <h3 className="text-2xl leading-none font-bold tracking-tight">{label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/75">{blurb}</p>
                <span className="mt-4 inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-semibold text-neutral-900 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  Browse <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
