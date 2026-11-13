// ⚠️ DATOS DE CONTACTO DE EJEMPLO — reemplázalos por los reales de KM Viajes y Aventura.
export const SITE = {
  name: "KM Viajes y Aventura",
  whatsappNumber: "51999999999", // formato internacional sin "+" ni espacios
  whatsappDisplay: "+51 999 999 999",
  phoneDisplay: "(01) 555-1234",
  phoneHref: "tel:+5115551234",
  email: "reservas@kmviajesyaventura.com",
  address: "Av. José Larco 123, Of. 401, Miraflores, Lima",
  mapQuery: "Av. José Larco 123, Miraflores, Lima, Perú",
  hours: ["Lunes a viernes: 9:00 a.m. – 7:00 p.m.", "Sábados: 9:00 a.m. – 1:00 p.m."],
  ruc: "20XXXXXXXXX",
  legalName: "KM Viajes y Aventura S.A.C.",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
  },
  defaultWhatsappMessage: "Hola KM Viajes y Aventura, quiero cotizar un viaje",
} as const;

export function whatsappLink(message: string = SITE.defaultWhatsappMessage) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function packageWhatsappLink(title: string) {
  return whatsappLink(`Hola KM Viajes y Aventura, quiero cotizar el paquete "${title}"`);
}

const pen = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 });
export function formatPEN(v: number | null | undefined) {
  return v == null ? "" : `S/ ${pen.format(v)}`;
}
export function formatUSD(v: number | null | undefined) {
  return v == null ? "" : `USD ${pen.format(v)}`;
}

export const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/paquetes-nacionales", label: "Nacionales" },
  { to: "/paquetes-internacionales", label: "Internacionales" },
  { to: "/cruceros", label: "Cruceros" },
  { to: "/hospedaje", label: "Hospedaje" },
  { to: "/seguros-de-viaje", label: "Seguros" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;
