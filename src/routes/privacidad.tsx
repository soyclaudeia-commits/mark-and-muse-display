import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad | KM Viajes y Aventura" },
      { name: "description", content: "Cómo KM Viajes y Aventura protege tus datos personales conforme a la Ley N.° 29733." },
      { property: "og:title", content: "Política de privacidad | KM Viajes y Aventura" },
      { property: "og:description", content: "Protección de datos personales." },
    ],
  }),
  component: () => (
    <section className="container-km max-w-3xl py-16">
      <h1 className="heading-brand text-3xl">Política de privacidad</h1>
      {/* ⚠️ TEXTO BASE DE EJEMPLO — revísalo con tu asesor legal */}
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>{SITE.legalName} trata los datos personales que nos proporcionas (nombre, correo, teléfono y datos del viaje) únicamente para atender tus cotizaciones, reservas y reclamos, conforme a la Ley N.° 29733 de Protección de Datos Personales.</p>
        <p>No compartimos tus datos con terceros salvo con proveedores necesarios para tu viaje (aerolíneas, hoteles, aseguradoras). Puedes ejercer tus derechos de acceso, rectificación y cancelación escribiendo a {SITE.email}.</p>
      </div>
    </section>
  ),
});
