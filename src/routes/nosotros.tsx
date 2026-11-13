import { createFileRoute } from "@tanstack/react-router";
import { Eye, Target } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { WhyUsSection } from "@/components/site/HomeSections";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros | KM Viajes y Aventura" },
      { name: "description", content: "Conoce a KM Viajes y Aventura, agencia de viajes en Lima con atención personalizada." },
      { property: "og:title", content: "Nosotros | KM Viajes y Aventura" },
      { property: "og:description", content: "Nuestra historia, misión y visión." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Quiénes somos" title="Nosotros" image="/images/hero-machu-picchu.jpg" />
      <section className="py-16">
        <div className="container-km grid gap-10 lg:grid-cols-2 lg:items-center">
          <img src="/images/nosotros-equipo.jpg" alt="Asesora de KM Viajes y Aventura atendiendo a clientes en Lima" loading="lazy" width={1024} height={768} className="rounded-3xl shadow-card" />
          <div>
            <p className="eyebrow mb-3">Nuestra historia</p>
            <h2 className="heading-brand text-3xl">Viajes pensados para ti</h2>
            {/* ⚠️ TEXTO DE EJEMPLO — reemplázalo por la historia real de la agencia */}
            <p className="mt-4 text-muted-foreground">KM Viajes y Aventura nació en Lima con una idea simple: que viajar sea fácil, seguro y emocionante. Acompañamos a familias, parejas y grupos a descubrir el Perú y el mundo, cuidando cada detalle del viaje.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface p-5"><Target className="h-7 w-7 text-primary" /><h3 className="mt-3 font-bold uppercase">Misión</h3><p className="mt-1 text-sm text-muted-foreground">Crear experiencias de viaje memorables con asesoría cercana y las mejores tarifas.</p></div>
              <div className="rounded-2xl bg-surface p-5"><Eye className="h-7 w-7 text-primary" /><h3 className="mt-3 font-bold uppercase">Visión</h3><p className="mt-1 text-sm text-muted-foreground">Ser la agencia de viajes de confianza de las familias peruanas.</p></div>
            </div>
          </div>
        </div>
      </section>
      <WhyUsSection />
    </>
  );
}
