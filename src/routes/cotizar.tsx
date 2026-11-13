import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { QuoteForm } from "@/components/site/QuoteForm";
import { SERVICE_TYPES } from "@/lib/forms.schema";
import { parseCotizarSearch } from "@/lib/cotizar-search";

export const Route = createFileRoute("/cotizar")({
  validateSearch: parseCotizarSearch,
  head: () => ({
    meta: [
      { title: "Cotiza tu viaje | KM Viajes y Aventura" },
      { name: "description", content: "Solicita una cotización personalizada de paquetes, hoteles, cruceros o seguros de viaje." },
      { property: "og:title", content: "Cotiza tu viaje | KM Viajes y Aventura" },
      { property: "og:description", content: "Un asesor te enviará una propuesta a medida." },
    ],
  }),
  component: Page,
});

function Page() {
  const s = Route.useSearch();
  const service = SERVICE_TYPES.find((t) => t === s.servicio) ?? "Paquete turístico";
  const key = JSON.stringify(s);
  return (
    <>
      <PageHero eyebrow="Cotización personalizada" title="Cotiza tu viaje" subtitle="Completa tus datos y te contactamos con la mejor propuesta." image="/images/punta-cana.jpg" />
      <section className="bg-surface py-14">
        <div className="container-km max-w-3xl">
          <QuoteForm
            key={key}
            defaults={{
              service_type: service,
              origin: s.origen ?? "Lima",
              destination: s.destino ?? "",
              departure_date: s.salida ?? "",
              return_date: s.regreso ?? "",
              adults: s.adultos ?? 2,
              children: s.ninos ?? 0,
              package_title: s.paquete ?? "",
              comments: s.paquete ? `Me interesa el paquete "${s.paquete}".` : "",
            }}
          />
        </div>
      </section>
    </>
  );
}
