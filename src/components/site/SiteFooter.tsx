import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

const PAYMENTS = ["Visa", "Mastercard", "American Express", "Yape", "Plin", "Transferencia", "PagoEfectivo"];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-km grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo className="h-20" />
          <p className="text-sm leading-relaxed text-ink-foreground/70">
            Agencia de viajes minorista en Lima. Paquetes nacionales e internacionales, cruceros, hospedaje y
            seguros con atención personalizada.
          </p>
          <SocialLinks variant="dark" />
        </div>
        <div>
          <h3 className="heading-brand mb-4 text-sm">Enlaces rápidos</h3>
          <ul className="space-y-2 text-sm text-ink-foreground/70">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-ink-foreground">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="heading-brand mb-4 text-sm">Contacto</h3>
          <ul className="space-y-3 text-sm text-ink-foreground/70">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{SITE.address}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={SITE.phoneHref}>{SITE.phoneDisplay}</a></li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappDisplay}</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{SITE.hours.join(" · ")}</span></li>
          </ul>
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="heading-brand mb-4 text-sm">Legal</h3>
            <ul className="space-y-2 text-sm text-ink-foreground/70">
              <li><Link to="/privacidad" className="hover:text-ink-foreground">Política de privacidad</Link></li>
              <li><Link to="/terminos" className="hover:text-ink-foreground">Términos y condiciones</Link></li>
            </ul>
          </div>
          <Link
            to="/libro-de-reclamaciones"
            className="flex items-center gap-3 rounded-xl border border-ink-foreground/20 p-3 transition-colors hover:border-primary"
          >
            <BookOpen className="h-8 w-8 shrink-0 text-primary" />
            <span className="text-sm font-bold uppercase leading-tight tracking-wide">Libro de<br />reclamaciones</span>
          </Link>
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-ink-foreground/60">Medios de pago</h3>
            <div className="flex flex-wrap gap-1.5">
              {PAYMENTS.map((p) => (
                <span key={p} className="rounded-md bg-ink-foreground/10 px-2 py-1 text-[11px] font-semibold">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-km flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-foreground/50 sm:flex-row">
          <span>© {new Date().getFullYear()} {SITE.legalName} · RUC {SITE.ruc}</span>
        </div>
      </div>
    </footer>
  );
}
