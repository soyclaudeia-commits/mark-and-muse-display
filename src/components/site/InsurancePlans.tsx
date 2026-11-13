import { Check, Minus, ShieldAlert } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ⚠️ COBERTURAS DE EJEMPLO — ajústalas según la aseguradora con la que trabajes.
const PLANS = [
  { name: "Básico", price: "Desde USD 3 / día", highlight: false },
  { name: "Plus", price: "Desde USD 5 / día", highlight: true },
  { name: "Premium", price: "Desde USD 8 / día", highlight: false },
];
const ROWS: { label: string; values: (string | boolean)[] }[] = [
  { label: "Cobertura médica", values: ["USD 30,000", "USD 60,000", "USD 150,000"] },
  { label: "Pérdida de equipaje", values: ["USD 600", "USD 1,200", "USD 2,500"] },
  { label: "Cancelación de viaje", values: [false, "USD 1,000", "USD 3,000"] },
  { label: "COVID-19", values: [true, true, true] },
  { label: "Deportes de aventura", values: [false, false, true] },
  { label: "Asistencia 24/7 en español", values: [true, true, true] },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-whatsapp" aria-label="Incluido" />;
  if (v === false) return <Minus className="mx-auto h-5 w-5 text-muted-foreground" aria-label="No incluido" />;
  return <span className="font-semibold">{v}</span>;
}

export function InsurancePlans() {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 rounded-2xl border-2 border-primary bg-accent p-5">
        <ShieldAlert className="h-8 w-8 shrink-0 text-primary" />
        <div>
          <p className="font-extrabold uppercase tracking-wide text-primary">Viaja protegido</p>
          <p className="text-sm text-foreground/85">Muchos países exigen seguro de viaje obligatorio (por ejemplo, la zona Schengen en Europa). No arriesgues tu viaje.</p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl bg-card shadow-card">
        <table className="w-full min-w-[640px] text-center text-sm">
          <thead>
            <tr>
              <th className="p-5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Cobertura</th>
              {PLANS.map((p) => (
                <th key={p.name} className={cn("p-5", p.highlight && "bg-primary text-primary-foreground")}>
                  <span className="block text-lg font-extrabold uppercase tracking-wider">{p.name}</span>
                  <span className={cn("block text-xs font-medium", p.highlight ? "text-primary-foreground/85" : "text-muted-foreground")}>{p.price}</span>
                  {p.highlight && <span className="mt-1 inline-block rounded-full bg-primary-foreground px-2 py-0.5 text-[10px] font-bold uppercase text-primary">Recomendado</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label} className="border-t">
                <td className="p-4 text-left font-medium">{r.label}</td>
                {r.values.map((v, i) => (
                  <td key={i} className={cn("p-4", PLANS[i]?.highlight && "bg-accent/60")}><Cell v={v} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Button asChild variant="brand" size="lg">
          <Link to="/cotizar" search={{ servicio: "Seguro de viaje" }}>Cotizar mi seguro</Link>
        </Button>
      </div>
    </div>
  );
}
