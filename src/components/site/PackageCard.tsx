import { Link } from "@tanstack/react-router";
import { Bed, Car, Clock, Map, Plane, Ship, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PackageRow } from "@/lib/packages";
import { packageWhatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PriceTag } from "./PriceTag";
import { WhatsAppIcon } from "./WhatsAppIcon";

const BADGE_STYLE: Record<string, string> = {
  Oferta: "bg-primary text-primary-foreground",
  "Más vendido": "bg-gold text-ink",
  "Salida garantizada": "bg-ink text-ink-foreground",
};

export function PackageBadge({ badge, className }: { badge: string; className?: string }) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-soft", BADGE_STYLE[badge] ?? "bg-background text-foreground", className)}>
      {badge}
    </span>
  );
}

export function PackageCard({ pkg }: { pkg: PackageRow }) {
  const isHotel = pkg.category === "hotel";
  const isCruise = pkg.category === "crucero";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link to="/paquete/$slug" params={{ slug: pkg.slug }} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={pkg.image_url}
          alt={`${pkg.title} - ${isHotel ? "hotel" : "paquete turístico"} ${pkg.destination}`}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="bg-card-overlay absolute inset-0" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {pkg.badge && <PackageBadge badge={pkg.badge} />}
          {pkg.is_offer && pkg.badge !== "Oferta" && <PackageBadge badge="Oferta" />}
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
          {isHotel ? (
            <div className="flex gap-0.5">
              {Array.from({ length: pkg.stars ?? 0 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-overlay/50 px-3 py-1 text-xs font-bold backdrop-blur">
              <Clock className="h-3.5 w-3.5" /> {pkg.duration_days}D/{pkg.duration_nights}N
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {isCruise ? pkg.operator : isHotel ? pkg.location : pkg.region}
        </p>
        <h3 className="mt-1 text-lg font-bold leading-snug">
          <Link to="/paquete/$slug" params={{ slug: pkg.slug }} className="hover:text-primary">
            {pkg.title}
          </Link>
        </h3>
        {isCruise && <p className="mt-1 text-sm text-muted-foreground">{pkg.destination}</p>}
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
          {isHotel ? (
            pkg.amenities.slice(0, 4).map((a) => <li key={a} className="rounded-full bg-muted px-2.5 py-1">{a}</li>)
          ) : isCruise ? (
            <>
              <li className="inline-flex items-center gap-1"><Ship className="h-3.5 w-3.5" /> {pkg.duration_nights} noches</li>
              <li className="inline-flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> Pensión completa</li>
            </>
          ) : (
            <>
              <li className="inline-flex items-center gap-1"><Plane className="h-3.5 w-3.5" /> Vuelo</li>
              <li className="inline-flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> Hotel</li>
              <li className="inline-flex items-center gap-1"><Car className="h-3.5 w-3.5" /> Traslados</li>
              <li className="inline-flex items-center gap-1"><Map className="h-3.5 w-3.5" /> Tours</li>
            </>
          )}
        </ul>
        <div className="mt-auto pt-5">
          <PriceTag pen={pkg.price_pen} usd={pkg.price_usd} suffix={isHotel ? "por noche" : "por persona"} discount={pkg.is_offer ? pkg.offer_discount : null} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button asChild variant="outline" size="sm" className="h-10">
              <Link to="/paquete/$slug" params={{ slug: pkg.slug }}>Más información</Link>
            </Button>
            <Button asChild variant="whatsapp" size="sm" className="h-10">
              <a href={packageWhatsappLink(pkg.title)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Cotizar
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
