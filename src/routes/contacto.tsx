import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { QuoteForm } from "@/components/site/QuoteForm";
import { SocialLinks } from "@/components/site/SocialLinks";
import { SITE, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | KM Viajes y Aventura - Agencia de viajes Lima" },
      { name: "description", content: "Contáctanos por WhatsApp, teléfono o correo. Visítanos en Miraflores, Lima." },
      { property: "og:title", content: "Contacto | KM Viajes y Aventura" },
      { property: "og:description", content: "Escríbenos y cotiza tu próximo viaje." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Hablemos" title="Contacto" subtitle="Estamos listos para ayudarte a planear tu viaje." image="/images/rio.jpg" />
      <section className="bg-surface py-16">
        <div className="container-km grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <ul className="space-y-4 rounded-2xl bg-card p-6 shadow-soft text-sm">
              <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" />{SITE.address}</li>
              <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /><a href={SITE.phoneHref}>{SITE.phoneDisplay}</a></li>
              <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappDisplay}</a></li>
              <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-primary" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-primary" /><span>{SITE.hours.join(" · ")}</span></li>
            </ul>
            <SocialLinks />
            <iframe title="Mapa de KM Viajes y Aventura" src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`} className="h-72 w-full rounded-2xl border-0 shadow-soft" loading="lazy" />
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
