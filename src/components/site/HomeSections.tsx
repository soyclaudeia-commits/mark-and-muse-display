import { Link } from "@tanstack/react-router";
import {
  BadgePercent, BedDouble, CreditCard, Globe2, Headphones, HeartHandshake, Plane, Quote, ShieldCheck, Ship, Star, UserCheck,
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import type { PackageRow } from "@/lib/packages";
import { packageWhatsappLink } from "@/lib/site";
import { Countdown } from "./Countdown";
import { PriceTag } from "./PriceTag";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { WhatsAppIcon } from "./WhatsAppIcon";

const SERVICES = [
  { icon: Plane, title: "Paquetes aéreos", text: "Nacionales e internacionales con vuelo + hotel + traslados.", to: "/paquetes-nacionales" as const },
  { icon: BedDouble, title: "Hospedajes", text: "Hoteles, resorts y apart-hoteles con la mejor tarifa.", to: "/hospedaje" as const },
  { icon: Ship, title: "Cruceros", text: "Caribe, Mediterráneo, Sudamérica y Alaska.", to: "/cruceros" as const },
  { icon: ShieldCheck, title: "Seguros de viaje", text: "Asistencia médica, equipaje y cancelación.", to: "/seguros-de-viaje" as const },
  { icon: UserCheck, title: "Asesoría personalizada", text: "Te ayudamos con documentos y trámites de viaje.", to: "/contacto" as const },
];

export function ServicesSection() {
  return (
    <section className="bg-surface py-20">
      <div className="container-km">
        <SectionHeading eyebrow="Nuestros servicios" title="Todo para tu viaje en un solo lugar" subtitle="Nos encargamos de cada detalle para que solo pienses en disfrutar." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <Link to={s.to} className="group flex h-full flex-col rounded-2xl bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-base font-bold uppercase tracking-wide">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OffersSection({ offers }: { offers: PackageRow[] }) {
  if (!offers.length) return null;
  return (
    <section className="bg-ink py-20 text-ink-foreground">
      <div className="container-km">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">Ofertas del mes</p>
            <h2 className="heading-brand text-2xl sm:text-4xl">Precios especiales por tiempo limitado</h2>
          </div>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="relative">
          <CarouselContent>
            {offers.map((o) => (
              <CarouselItem key={o.id} className="md:basis-1/2 lg:basis-1/2">
                <article className="relative isolate flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl p-6 sm:p-8">
                  <img src={o.image_url} alt={`Oferta ${o.title}`} loading="lazy" width={1024} height={768} className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="bg-card-overlay absolute inset-0 -z-10" />
                  {o.offer_discount ? (
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground">
                      <BadgePercent className="h-4 w-4" /> -{o.offer_discount}%
                    </span>
                  ) : null}
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/80">{o.duration_days}D/{o.duration_nights}N · {o.destination}</p>
                  <h3 className="heading-brand mt-2 text-2xl text-primary-foreground sm:text-3xl">{o.title}</h3>
                  {o.offer_ends_at && (
                    <div className="mt-4 text-primary-foreground">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-80">La oferta termina en</p>
                      <Countdown endsAt={o.offer_ends_at} />
                    </div>
                  )}
                  <div className="mt-5 flex flex-wrap items-end justify-between gap-4 rounded-2xl bg-card/95 p-4 text-card-foreground">
                    <PriceTag pen={o.price_pen} usd={o.price_usd} discount={o.offer_discount} suffix="por persona" />
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="h-10">
                        <Link to="/paquete/$slug" params={{ slug: o.slug }}>Ver detalle</Link>
                      </Button>
                      <Button asChild variant="whatsapp" size="sm" className="h-10">
                        <a href={packageWhatsappLink(o.title)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Lo quiero</a>
                      </Button>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 top-1/2 border-0 bg-card text-card-foreground lg:-left-5" />
          <CarouselNext className="right-2 top-1/2 border-0 bg-card text-card-foreground lg:-right-5" />
        </Carousel>
      </div>
    </section>
  );
}

const BENEFITS = [
  { icon: HeartHandshake, title: "Atención personalizada", text: "Un asesor dedicado que entiende lo que buscas." },
  { icon: BadgePercent, title: "Mejores tarifas", text: "Convenios con aerolíneas, hoteles y navieras." },
  { icon: Headphones, title: "Asesoría 360°", text: "Te acompañamos antes, durante y después del viaje." },
  { icon: CreditCard, title: "Múltiples formas de pago", text: "Tarjetas, Yape, Plin, transferencias y cuotas." },
  { icon: Globe2, title: "Experiencia en destinos", text: "Conocemos los destinos que te recomendamos." },
  { icon: ShieldCheck, title: "Respaldo y confianza", text: "Agencia formal con RUC y libro de reclamaciones." },
];

export function WhyUsSection() {
  return (
    <section className="py-20">
      <div className="container-km">
        <SectionHeading eyebrow="¿Por qué elegirnos?" title="Viaja tranquilo con KM" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 60}>
              <div className="flex gap-4 rounded-2xl border p-6 transition-colors hover:border-primary">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><b.icon className="h-6 w-6" /></span>
                <div>
                  <h3 className="font-bold uppercase tracking-wide">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ⚠️ TESTIMONIOS DE EJEMPLO — reemplázalos por opiniones reales de tus clientes.
const TESTIMONIALS = [
  { name: "Lucía Fernández", place: "Cusco y Machu Picchu", text: "Todo salió perfecto: vuelos, hotel y el guía en Machu Picchu fue increíble. Nos sentimos acompañados en cada momento.", stars: 5 },
  { name: "Carlos Mendoza", place: "Cancún Todo Incluido", text: "Nos consiguieron una tarifa que no encontramos en ningún otro lado. Mi familia quedó feliz con el resort.", stars: 5 },
  { name: "Andrea Quispe", place: "Crucero Mediterráneo", text: "Nuestro primer crucero y fue un sueño. Nos ayudaron con el seguro y todos los documentos.", stars: 5 },
  { name: "Jorge Ramírez", place: "Madrid y París", text: "La asesoría fue excelente. Respondieron cada duda por WhatsApp, incluso estando de viaje.", stars: 4 },
  { name: "María Torres", place: "Máncora sol y playa", text: "Rápidos, amables y muy organizados. Ya estamos planeando el siguiente viaje con KM.", stars: 5 },
];

export function TestimonialsSection() {
  return (
    <section className="bg-surface py-20">
      <div className="container-km">
        <SectionHeading eyebrow="Testimonios" title="Lo que dicen nuestros viajeros" />
        <Carousel opts={{ align: "start", loop: true }} className="mx-auto max-w-6xl">
          <CarouselContent>
            {TESTIMONIALS.map((t) => (
              <CarouselItem key={t.name} className="sm:basis-1/2 lg:basis-1/3">
                <figure className="flex h-full flex-col rounded-2xl bg-card p-6 shadow-soft">
                  <Quote className="h-8 w-8 text-primary" />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">“{t.text}”</blockquote>
                  <div className="mt-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={i < t.stars ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4 text-border"} />
                    ))}
                  </div>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{t.name}</span>
                      <span className="block text-xs text-muted-foreground">{t.place}</span>
                    </span>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
