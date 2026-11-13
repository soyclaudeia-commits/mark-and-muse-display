import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { PackageRow } from "@/lib/packages";
import { cn } from "@/lib/utils";
import { PackageCard } from "./PackageCard";
import { Reveal } from "./Reveal";
import { selectClass } from "./QuoteForm";

const DURATIONS = [
  { key: "all", label: "Cualquier duración", test: () => true },
  { key: "short", label: "Hasta 4 días", test: (d: number) => d <= 4 },
  { key: "mid", label: "5 a 7 días", test: (d: number) => d >= 5 && d <= 7 },
  { key: "long", label: "8 días a más", test: (d: number) => d >= 8 },
];
const PRICES = [
  { key: "all", label: "Cualquier precio", test: () => true },
  { key: "a", label: "Hasta S/ 1,000", test: (p: number) => p <= 1000 },
  { key: "b", label: "S/ 1,000 – S/ 3,000", test: (p: number) => p > 1000 && p <= 3000 },
  { key: "c", label: "S/ 3,000 – S/ 7,000", test: (p: number) => p > 3000 && p <= 7000 },
  { key: "d", label: "Más de S/ 7,000", test: (p: number) => p > 7000 },
];

export function PackageCatalog({ packages, mode }: { packages: PackageRow[]; mode: "filters" | "regions" | "none" }) {
  const [destination, setDestination] = useState("all");
  const [duration, setDuration] = useState("all");
  const [price, setPrice] = useState("all");
  const [region, setRegion] = useState("Todas");

  const regions = useMemo(() => ["Todas", ...Array.from(new Set(packages.map((p) => p.region).filter(Boolean) as string[]))], [packages]);
  const destinations = useMemo(() => Array.from(new Set(packages.map((p) => p.destination))), [packages]);

  const filtered = packages.filter((p) => {
    if (mode === "regions") return region === "Todas" || p.region === region;
    if (mode === "filters") {
      const d = DURATIONS.find((x) => x.key === duration)!;
      const pr = PRICES.find((x) => x.key === price)!;
      return (destination === "all" || p.destination === destination) && d.test(p.duration_days) && pr.test(Number(p.price_pen ?? 0));
    }
    return true;
  });

  return (
    <div>
      {mode === "filters" && (
        <div className="mb-8 grid gap-3 rounded-2xl bg-card p-4 shadow-soft sm:grid-cols-[auto_1fr_1fr_1fr] sm:items-center">
          <span className="hidden items-center gap-2 px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:flex">
            <SlidersHorizontal className="h-4 w-4" /> Filtrar
          </span>
          <select aria-label="Destino" className={selectClass} value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="all">Todos los destinos</option>
            {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select aria-label="Duración" className={selectClass} value={duration} onChange={(e) => setDuration(e.target.value)}>
            {DURATIONS.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}
          </select>
          <select aria-label="Precio" className={selectClass} value={price} onChange={(e) => setPrice(e.target.value)}>
            {PRICES.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}
          </select>
        </div>
      )}
      {mode === "regions" && (
        <div role="tablist" className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {regions.map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={region === r}
              onClick={() => setRegion(r)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                region === r ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary hover:text-primary",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      )}
      {filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70}><PackageCard pkg={p} /></Reveal>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-card p-10 text-center text-muted-foreground">No encontramos paquetes con esos filtros. Prueba otra combinación o escríbenos.</p>
      )}
    </div>
  );
}
