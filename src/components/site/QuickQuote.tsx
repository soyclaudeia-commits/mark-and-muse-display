import { useNavigate } from "@tanstack/react-router";
import { BedDouble, CalendarDays, MapPin, Package, Search, ShieldCheck, Ship, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SERVICE_TYPES } from "@/lib/forms.schema";

const TABS: { key: string; label: string; icon: typeof Package; service: (typeof SERVICE_TYPES)[number] }[] = [
  { key: "paquetes", label: "Paquetes", icon: Package, service: "Paquete turístico" },
  { key: "hospedaje", label: "Hospedaje", icon: BedDouble, service: "Hospedaje" },
  { key: "cruceros", label: "Cruceros", icon: Ship, service: "Crucero" },
  { key: "seguros", label: "Seguros", icon: ShieldCheck, service: "Seguro de viaje" },
];

function Box({ icon: Icon, label, children }: { icon: typeof Package; label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 rounded-xl border bg-background px-3 py-2 focus-within:border-primary">
      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" /> {label}
      </span>
      {children}
    </label>
  );
}

const bare = "h-7 border-0 p-0 shadow-none focus-visible:ring-0 text-sm font-medium";

export function QuickQuote() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(TABS[0]!);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const s = (k: string) => String(f.get(k) ?? "").trim() || undefined;
    navigate({
      to: "/cotizar",
      search: {
        servicio: tab.service,
        origen: s("origin"),
        destino: s("destination"),
        salida: s("departure"),
        regreso: s("return"),
        adultos: Number(f.get("adults") || 2),
        ninos: Number(f.get("children") || 0),
      },
    });
  }

  return (
    <div className="w-full rounded-2xl bg-card p-3 text-card-foreground shadow-card sm:p-4">
      <div role="tablist" className="mb-3 flex gap-1 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab.key === t.key}
            onClick={() => setTab(t)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
              tab.key === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
            )}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>
      <form onSubmit={onSubmit} className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto_auto_auto]">
        <Box icon={MapPin} label="Origen"><Input name="origin" defaultValue="Lima" className={bare} /></Box>
        <Box icon={MapPin} label="Destino"><Input name="destination" placeholder="¿A dónde vas?" className={bare} /></Box>
        <Box icon={CalendarDays} label="Salida"><Input name="departure" type="date" className={bare} /></Box>
        <Box icon={CalendarDays} label="Regreso"><Input name="return" type="date" className={bare} /></Box>
        <Box icon={Users} label="Adultos"><Input name="adults" type="number" min={1} defaultValue={2} className={cn(bare, "w-full lg:w-14")} /></Box>
        <Box icon={Users} label="Niños"><Input name="children" type="number" min={0} defaultValue={0} className={cn(bare, "w-full lg:w-14")} /></Box>
        <Button type="submit" variant="brand" className="h-full min-h-14 rounded-xl px-6 sm:col-span-2 lg:col-span-1">
          <Search /> Cotizar mi viaje
        </Button>
      </form>
    </div>
  );
}
