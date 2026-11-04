import { categories } from "@/lib/constants";

// endless ticker of studio types (one transform animation, pauses on hover)
export default function Marquee() {
  const items = [...categories.map((c) => c.label), "Podcast Rooms", "Rehearsal Spaces", "Cyc Walls"];
  const row = [...items, ...items];

  return (
    <div className="group relative overflow-hidden border-y bg-foreground py-4 text-background">
      <div className="flex w-max animate-marquee gap-10 pr-10 group-hover:[animation-play-state:paused]">
        {row.map((label, i) => (
          <span key={i} className="flex items-center gap-10 font-heading text-xl font-bold tracking-tight whitespace-nowrap sm:text-2xl">
            <span className={i % 2 ? "text-outline" : ""}>{label}</span>
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
