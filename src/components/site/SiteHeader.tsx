import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur transition-shadow",
        scrolled ? "shadow-soft" : "border-transparent",
      )}
    >
      <div className="hidden bg-ink text-ink-foreground md:block">
        <div className="container-km flex h-9 items-center justify-between text-xs">
          <span className="tracking-wide">Agencia de viajes en Lima · Atención personalizada</span>
          <div className="flex items-center gap-5">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-1.5 hover:text-primary-foreground/80">
              <Phone className="h-3.5 w-3.5" /> {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-primary-foreground/80">{SITE.email}</a>
          </div>
        </div>
      </div>
      <div className="container-km grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-20">
        <Logo className="h-11 lg:h-14" />
        <nav aria-label="Principal" className="hidden justify-center xl:flex">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="rounded-full px-3 py-2 text-[13px] font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-start-3 flex items-center gap-2">
          <Button asChild variant="brand" size="sm" className="hidden h-10 px-5 sm:inline-flex">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Cotiza por WhatsApp
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Abrir menú">
                <Menu className="!size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-0">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="bg-primary p-6">
                  <Logo className="h-14" />
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-1">
                    {NAV_LINKS.map((l) => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          onClick={() => setOpen(false)}
                          activeOptions={{ exact: l.to === "/" }}
                          className="block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-muted data-[status=active]:bg-accent data-[status=active]:text-primary"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="border-t p-4">
                  <Button asChild variant="whatsapp" size="lg" className="w-full">
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon /> Cotiza por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
