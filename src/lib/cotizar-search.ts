export type CotizarSearch = {
  servicio?: string | undefined;
  origen?: string | undefined;
  destino?: string | undefined;
  salida?: string | undefined;
  regreso?: string | undefined;
  adultos?: number | undefined;
  ninos?: number | undefined;
  paquete?: string | undefined;
};
const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim().slice(0, 200) : undefined);
const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 && n <= 50 ? Math.floor(n) : undefined;
};
export function parseCotizarSearch(s: Record<string, unknown>): CotizarSearch {
  return {
    servicio: str(s["servicio"]), origen: str(s["origen"]), destino: str(s["destino"]),
    salida: str(s["salida"]), regreso: str(s["regreso"]), adultos: num(s["adultos"]),
    ninos: num(s["ninos"]), paquete: str(s["paquete"]),
  };
}
