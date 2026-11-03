import { cn } from "cn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-12 max-w-2xl", align === "center" ? "mx-auto text-center" : "", className)}>
      <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase">
        <span className="size-1.5 rounded-full bg-primary" />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}
