import { Link } from "@tanstack/react-router";
import logo from "@/assets/km-viajes-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="KM Viajes y Aventura - Inicio" className={cn("inline-flex shrink-0", className)}>
      <img
        src={logo.url}
        alt="Logo KM Viajes y Aventura, agencia de viajes en Lima"
        width={622}
        height={502}
        className="h-full w-auto rounded-lg object-contain"
      />
    </Link>
  );
}
