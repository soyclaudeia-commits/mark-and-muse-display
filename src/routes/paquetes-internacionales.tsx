import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { PackageCatalog } from "@/components/site/PackageCatalog";
import { packagesQuery } from "@/lib/packages.queries";

export const Route = createFileRoute("/paquetes-internacionales")({
  head: () => ({
    meta: [
      { title: "Paquetes internacionales desde Lima | KM Viajes y Aventura" },
      { name: "description", content: "Paquetes a Cancún, Punta Cana, Miami, Buenos Aires, Río, Europa, Estambul y Tokio desde Lima." },
      { property: "og:title", content: "Paquetes internacionales desde Lima | KM Viajes y Aventura" },
      { property: "og:description", content: "Paquetes a Cancún, Punta Cana, Miami, Buenos Aires, Río, Europa, Estambul y Tokio desde Lima." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(packagesQuery("internacional")),
  component: Page,
});

function Page() {
  const { data } = useSuspenseQuery(packagesQuery("internacional"));
  return (
    <>
      <PageHero eyebrow="Descubre el mundo" title="Paquetes internacionales" subtitle="Caribe, Norteamérica, Sudamérica, Europa y Asia saliendo desde Lima." image="/images/cancun.jpg" />
      <section className="bg-surface py-14">
        <div className="container-km"><PackageCatalog packages={data} mode="regions" /></div>
      </section>
    </>
  );
}
