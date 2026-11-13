import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones | KM Viajes y Aventura" },
      { name: "description", content: "Condiciones generales de contratación de servicios turísticos de KM Viajes y Aventura." },
      { property: "og:title", content: "Términos y condiciones | KM Viajes y Aventura" },
      { property: "og:description", content: "Condiciones de reserva, pago y cancelación." },
    ],
  }),
  component: () => (
    <section className="container-km max-w-3xl py-16">
      <h1 className="heading-brand text-3xl">Términos y condiciones</h1>
      {/* ⚠️ TEXTO BASE DE EJEMPLO — revísalo con tu asesor legal */}
      <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>Los precios publicados son por persona en habitación doble, referenciales y sujetos a disponibilidad.</li>
        <li>Las reservas se confirman con el pago del adelanto acordado y la emisión del comprobante.</li>
        <li>Cambios y cancelaciones están sujetos a las políticas de cada proveedor (aerolíneas, hoteles y navieras).</li>
        <li>El pasajero es responsable de contar con documentos de viaje vigentes (DNI, pasaporte, visas, vacunas).</li>
      </ul>
    </section>
  ),
});
