import { cn } from "cn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  index,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  index?: string;
  align?: "center" | "left";
}) {
  return (
    <div data-reveal className={cn("mb-12 max-w-2xl", align === "center" ? "mx-auto text-center" : "", className)}>
      <p
        className={cn(
          "mb-4 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase",
          align === "center" && "justify-center",
        )}
      >
        {index && <span className="text-muted-foreground">({index})</span>}
        <span className="h-px w-8 bg-primary/60" />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}
