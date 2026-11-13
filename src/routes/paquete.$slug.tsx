import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Check, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageBadge } from "@/components/site/PackageCard";
import { PriceTag } from "@/components/site/PriceTag";
import { Countdown } from "@/components/site/Countdown";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { CATEGORY_LABEL, itineraryOf, type PackageCategory } from "@/lib/packages";
import { packageQuery } from "@/lib/packages.queries";
import { packageWhatsappLink } from "@/lib/site";

export const Route = createFileRoute("/paquete/$slug")({
  loader: async ({ context, params }) => {
    const pkg = await context.queryClient.ensureQueryData(packageQuery(params.slug));
    if (!pkg) throw notFound();
    return pkg;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | KM Viajes y Aventura` },
          { name: "description", content: `${loaderData.summary} ${loaderData.description}`.slice(0, 160) },
          { property: "og:title", content: `${loaderData.title} | KM Viajes y Aventura` },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Paquete no disponible | KM Viajes y Aventura" }, { name: "robots", content: "noindex" }],
  }),
  component: Page,
  notFoundComponent: () => (
    <div className="container-km py-24 text-center">
      <h1 className="heading-brand text-2xl">Paquete no disponible</h1>
      <Button asChild variant="brand" className="mt-6"><Link to="/">Volver al inicio</Link></Button>
    </div>
  ),
  errorComponent: ({ error }) => <div className="container-km py-24 text-center">{error.message}</div>,
});

function Page() {
  const { slug } = Route.useParams();
  const { data: pkg } = useSuspenseQuery(packageQuery(slug));
  if (!pkg) return null;
  const itinerary = itineraryOf(pkg);
  const gallery = pkg.gallery.length ? pkg.gallery : [pkg.image_url];
  const isHotel = pkg.category === "hotel";
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={pkg.image_url} alt={pkg.title} width={1200} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="bg-hero-overlay absolute inset-0 -z-10" />
        <div className="container-km py-24 text-primary-foreground sm:py-32">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-overlay/50 px-3 py-1 text-xs font-bold uppercase tracking-wider">{CATEGORY_LABEL[pkg.category as PackageCategory]}</span>
            {pkg.badge && <PackageBadge badge={pkg.badge} />}
          </div>
          <h1 className="heading-brand mt-4 max-w-3xl text-3xl sm:text-5xl">{pkg.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-primary-foreground/90">
            {!isHotel && <><Clock className="h-4 w-4" /> {pkg.duration_days}D/{pkg.duration_nights}N ·</>} {pkg.destination}
          </p>
        </div>
      </section>
      <section className="bg-surface py-12">
        <div className="container-km grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {gallery.map((g, i) => (
                <img key={g + i} src={g} alt={`${pkg.title} foto ${i + 1}`} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full rounded-2xl object-cover" />
              ))}
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <h2 className="heading-brand text-lg">Descripción</h2>
              <p className="mt-3 text-muted-foreground">{pkg.description}</p>
            </div>
            {itinerary.length > 0 && (
              <div className="rounded-2xl bg-card p-6 shadow-soft">
                <h2 className="heading-brand text-lg">Itinerario día a día</h2>
                <ol className="mt-5 space-y-5 border-l-2 border-primary/30 pl-6">
                  {itinerary.map((d) => (
                    <li key={d.day} className="relative">
                      <span className="absolute -left-[37px] grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{d.day}</span>
                      <h3 className="font-bold">Día {d.day}: {d.title}</h3>
                      <p className="text-sm text-muted-foreground">{d.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-card p-6 shadow-soft">
                <h2 className="heading-brand text-lg">{isHotel ? "Servicios" : "Incluye"}</h2>
                <ul className="mt-3 space-y-2 text-sm">{pkg.includes.map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-whatsapp" />{x}</li>)}</ul>
              </div>
              {pkg.not_includes.length > 0 && (
                <div className="rounded-2xl bg-card p-6 shadow-soft">
                  <h2 className="heading-brand text-lg">No incluye</h2>
                  <ul className="mt-3 space-y-2 text-sm">{pkg.not_includes.map((x) => <li key={x} className="flex gap-2"><X className="h-4 w-4 shrink-0 text-primary" />{x}</li>)}</ul>
                </div>
              )}
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <h2 className="heading-brand text-lg">Políticas</h2>
              <p className="mt-3 text-sm text-muted-foreground">{pkg.policies}</p>
            </div>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-4 rounded-2xl bg-card p-6 shadow-card">
              <PriceTag pen={pkg.price_pen} usd={pkg.price_usd} suffix={isHotel ? "por noche" : "por persona"} discount={pkg.is_offer ? pkg.offer_discount : null} />
              {pkg.is_offer && pkg.offer_ends_at && (
                <div className="rounded-xl bg-primary p-4 text-primary-foreground">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider">Oferta termina en</p>
                  <Countdown endsAt={pkg.offer_ends_at} />
                </div>
              )}
              <Button asChild variant="brand" size="lg" className="w-full">
                <Link to="/cotizar" search={{ paquete: pkg.title, destino: pkg.destination, servicio: isHotel ? "Hospedaje" : pkg.category === "crucero" ? "Crucero" : "Paquete turístico" }}>Reservar / Cotizar</Link>
              </Button>
              <Button asChild variant="whatsapp" size="lg" className="w-full">
                <a href={packageWhatsappLink(pkg.title)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Cotizar por WhatsApp</a>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
