export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div data-reveal className="relative mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-dashed pb-8">
      <div className="min-w-0">
        <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase">
          <span className="h-px w-8 bg-primary/60" />
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}
