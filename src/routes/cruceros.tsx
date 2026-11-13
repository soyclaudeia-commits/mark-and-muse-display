import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { PackageCatalog } from "@/components/site/PackageCatalog";
import { packagesQuery } from "@/lib/packages.queries";

export const Route = createFileRoute("/cruceros")({
  head: () => ({
    meta: [
      { title: "Cruceros desde Perú | KM Viajes y Aventura" },
      { name: "description", content: "Cruceros por el Caribe, Mediterráneo, Sudamérica y Alaska. Cotiza con una agencia de viajes en Lima." },
      { property: "og:title", content: "Cruceros desde Perú | KM Viajes y Aventura" },
      { property: "og:description", content: "Cruceros por el Caribe, Mediterráneo, Sudamérica y Alaska. Cotiza con una agencia de viajes en Lima." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(packagesQuery("crucero")),
  component: Page,
});

function Page() {
  const { data } = useSuspenseQuery(packagesQuery("crucero"));
  return (
    <>
      <PageHero eyebrow="Navega" title="Cruceros" subtitle="Caribe, Mediterráneo, Sudamérica y Alaska con las mejores navieras." image="/images/crucero-caribe.jpg" />
      <section className="bg-surface py-14">
        <div className="container-km"><PackageCatalog packages={data} mode="regions" /></div>
      </section>
    </>
  );
}
