export function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base text-muted-foreground md:text-lg">{sub}</p>}
    </div>
  );
}
