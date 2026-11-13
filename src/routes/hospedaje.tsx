import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { PackageCatalog } from "@/components/site/PackageCatalog";
import { packagesQuery } from "@/lib/packages.queries";

export const Route = createFileRoute("/hospedaje")({
  head: () => ({
    meta: [
      { title: "Hoteles y resorts | KM Viajes y Aventura" },
      { name: "description", content: "Reserva hoteles, resorts y apart-hoteles en Perú y el mundo con precio por noche en soles y dólares." },
      { property: "og:title", content: "Hoteles y resorts | KM Viajes y Aventura" },
      { property: "og:description", content: "Reserva hoteles, resorts y apart-hoteles en Perú y el mundo con precio por noche en soles y dólares." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(packagesQuery("hotel")),
  component: Page,
});

function Page() {
  const { data } = useSuspenseQuery(packagesQuery("hotel"));
  return (
    <>
      <PageHero eyebrow="Descansa" title="Hospedaje" subtitle="Hoteles, resorts y apart-hoteles seleccionados con la mejor tarifa." image="/images/hotel-resort.jpg" />
      <section className="bg-surface py-14">
        <div className="container-km"><PackageCatalog packages={data} mode="none" /></div>
      </section>
    </>
  );
}
