import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { PackageCatalog } from "@/components/site/PackageCatalog";
import { packagesQuery } from "@/lib/packages.queries";

export const Route = createFileRoute("/paquetes-nacionales")({
  head: () => ({
    meta: [
      { title: "Paquetes turísticos Perú | KM Viajes y Aventura" },
      { name: "description", content: "Paquetes nacionales a Cusco, Machu Picchu, Arequipa, Máncora, Iquitos y más desde Lima, con vuelo y hotel." },
      { property: "og:title", content: "Paquetes turísticos Perú | KM Viajes y Aventura" },
      { property: "og:description", content: "Paquetes nacionales a Cusco, Machu Picchu, Arequipa, Máncora, Iquitos y más desde Lima, con vuelo y hotel." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(packagesQuery("nacional")),
  component: Page,
});

function Page() {
  const { data } = useSuspenseQuery(packagesQuery("nacional"));
  return (
    <>
      <PageHero eyebrow="Viaja por el Perú" title="Paquetes nacionales" subtitle="Cusco, Arequipa, Máncora, la Amazonía y más. Vuelo, hotel, traslados y tours incluidos." image="/images/cusco.jpg" />
      <section className="bg-surface py-14">
        <div className="container-km"><PackageCatalog packages={data} mode="filters" /></div>
      </section>
    </>
  );
}
