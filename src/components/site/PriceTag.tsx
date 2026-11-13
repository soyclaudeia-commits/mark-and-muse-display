import { formatPEN, formatUSD } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PriceTag({ pen, usd, label = "Desde", suffix, className, discount }: { pen: number | null; usd: number | null; label?: string; suffix?: string; className?: string; discount?: number | null }) {
  const before = discount && pen ? Math.round(pen / (1 - discount / 100)) : null;
  return (
    <div className={cn("leading-tight", className)}>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {before && <span className="ml-2 text-xs text-muted-foreground line-through">{formatPEN(before)}</span>}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-primary">{formatPEN(pen)}</span>
        {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{formatUSD(usd)}</span>
    </div>
  );
}
