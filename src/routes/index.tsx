import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { QuickQuote } from "@/components/site/QuickQuote";
import { OffersSection, ServicesSection, TestimonialsSection, WhyUsSection } from "@/components/site/HomeSections";
import { PackageCard } from "@/components/site/PackageCard";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { offersQuery, packagesQuery } from "@/lib/packages.queries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KM Viajes y Aventura | Paquetes turísticos Perú y el mundo" },
      { name: "description", content: "Agencia de viajes en Lima. Paquetes aéreos, hoteles, cruceros y seguros de viaje con atención personalizada. Cotiza por WhatsApp." },
      { property: "og:title", content: "KM Viajes y Aventura | Tu próxima aventura comienza aquí" },
      { property: "og:description", content: "Paquetes aéreos, hoteles, cruceros y seguros de viaje. Nosotros nos encargamos de todo." },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(packagesQuery("nacional")),
      context.queryClient.ensureQueryData(packagesQuery("internacional")),
      context.queryClient.ensureQueryData(offersQuery()),
    ]),
  component: Index,
});

function Index() {
  const { data: nacionales } = useSuspenseQuery(packagesQuery("nacional"));
  const { data: internacionales } = useSuspenseQuery(packagesQuery("internacional"));
  const { data: offers } = useSuspenseQuery(offersQuery());
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src="/images/hero-machu-picchu.jpg" alt="Machu Picchu al amanecer, paquetes turísticos Perú" width={1920} height={1088} className="animate-hero-zoom absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="bg-hero-overlay absolute inset-0 -z-10" />
        <div className="container-km flex min-h-[88vh] flex-col justify-end gap-10 pb-10 pt-24 text-primary-foreground lg:min-h-[80vh]">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-primary-foreground/85">Agencia de viajes en Lima</p>
            <h1 className="heading-brand text-4xl sm:text-6xl">Tu próxima aventura comienza aquí</h1>
            <p className="mt-5 max-w-2xl text-base text-primary-foreground/90 sm:text-lg">
              Paquetes aéreos, hoteles, cruceros y seguros de viaje. Nosotros nos encargamos de todo.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg"><Link to="/paquetes-nacionales">Ver paquetes</Link></Button>
              <Button asChild variant="glass" size="lg"><Link to="/cotizar" search={{}}>Cotización personalizada</Link></Button>
            </div>
          </div>
          <QuickQuote />
        </div>
      </section>
      <ServicesSection />
      <section className="py-20">
        <div className="container-km">
          <SectionHeading eyebrow="Perú" title="Paquetes nacionales" subtitle="Descubre lo mejor del Perú con vuelo, hotel, traslados y tours." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {nacionales.slice(0, 4).map((p, i) => <Reveal key={p.id} delay={i * 70}><PackageCard pkg={p} /></Reveal>)}
          </div>
          <div className="mt-10 text-center"><Button asChild variant="outline" size="lg"><Link to="/paquetes-nacionales">Ver todos los nacionales</Link></Button></div>
        </div>
      </section>
      <OffersSection offers={offers} />
      <section className="py-20">
        <div className="container-km">
          <SectionHeading eyebrow="El mundo" title="Paquetes internacionales" subtitle="Caribe, Europa, Asia y más, saliendo desde Lima." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {internacionales.slice(0, 4).map((p, i) => <Reveal key={p.id} delay={i * 70}><PackageCard pkg={p} /></Reveal>)}
          </div>
          <div className="mt-10 text-center"><Button asChild variant="outline" size="lg"><Link to="/paquetes-internacionales">Ver todos los internacionales</Link></Button></div>
        </div>
      </section>
      <WhyUsSection />
      <TestimonialsSection />
      <section id="cotizar" className="py-20">
        <div className="container-km grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <SectionHeading align="left" eyebrow="Cotización personalizada" title="Cuéntanos tu viaje ideal" subtitle="Completa el formulario y un asesor te enviará una propuesta a medida." />
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
