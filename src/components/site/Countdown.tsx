import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    d: Math.floor(ms / 86_400_000),
    h: Math.floor((ms / 3_600_000) % 24),
    m: Math.floor((ms / 60_000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ endsAt }: { endsAt: string }) {
  const target = new Date(endsAt).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  const cells: [string, number | undefined][] = [
    ["Días", t?.d],
    ["Horas", t?.h],
    ["Min", t?.m],
    ["Seg", t?.s],
  ];
  return (
    <div className="flex gap-2" aria-label="Tiempo restante de la oferta">
      {cells.map(([label, v]) => (
        <div key={label} className="min-w-14 rounded-xl bg-primary-foreground/15 px-2 py-2 text-center backdrop-blur">
          <div className="text-xl font-extrabold tabular-nums sm:text-2xl">{v == null ? "--" : String(v).padStart(2, "0")}</div>
          <div className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{label}</div>
        </div>
      ))}
    </div>
  );
}
