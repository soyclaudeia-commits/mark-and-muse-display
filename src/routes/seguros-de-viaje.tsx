import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { InsurancePlans } from "@/components/site/InsurancePlans";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/seguros-de-viaje")({
  head: () => ({
    meta: [
      { title: "Seguros de viaje | KM Viajes y Aventura" },
      { name: "description", content: "Planes de seguro de viaje Básico, Plus y Premium: cobertura médica, equipaje, cancelación y deportes de aventura." },
      { property: "og:title", content: "Seguros de viaje | KM Viajes y Aventura" },
      { property: "og:description", content: "Viaja protegido con asistencia médica, equipaje y cancelación." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Viaja protegido" title="Seguros de viaje" subtitle="Asistencia médica, equipaje, cancelación y más, en cualquier parte del mundo." image="/images/madrid-paris.jpg" />
      <section className="bg-surface py-16">
        <div className="container-km">
          <SectionHeading title="Compara nuestros planes" subtitle="Elige la cobertura ideal según tu destino y tipo de viaje." />
          <InsurancePlans />
        </div>
      </section>
    </>
  );
}
