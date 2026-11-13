export function PageHero({ title, subtitle, image, eyebrow }: { title: string; subtitle?: string; image: string; eyebrow?: string }) {
  return (
    <section className="relative isolate overflow-hidden">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" width={1200} height={900} />
      <div className="bg-hero-overlay absolute inset-0 -z-10" />
      <div className="container-km py-20 text-primary-foreground sm:py-28">
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground/85">{eyebrow}</p>}
        <h1 className="heading-brand max-w-3xl text-3xl sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base text-primary-foreground/90 sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
