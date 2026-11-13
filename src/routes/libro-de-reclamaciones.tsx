import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { selectClass } from "@/components/site/QuoteForm";
import { submitComplaint } from "@/lib/forms.functions";
import { complaintSchema, type ComplaintInput } from "@/lib/forms.schema";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/libro-de-reclamaciones")({
  head: () => ({
    meta: [
      { title: "Libro de reclamaciones | KM Viajes y Aventura" },
      { name: "description", content: "Libro de reclamaciones virtual de KM Viajes y Aventura conforme al Código de Protección y Defensa del Consumidor." },
      { property: "og:title", content: "Libro de reclamaciones | KM Viajes y Aventura" },
      { property: "og:description", content: "Registra tu reclamo o queja." },
    ],
  }),
  component: Page,
});

function Page() {
  const send = useServerFn(submitComplaint);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ComplaintInput, unknown, z.output<typeof complaintSchema>>({
    resolver: zodResolver(complaintSchema),
    defaultValues: { document_type: "DNI", kind: "reclamo" },
  });
  const onSubmit = handleSubmit(async (v) => {
    setErr(null);
    try { await send({ data: v }); setDone(true); } catch (e) { setErr(e instanceof Error ? e.message : "Error"); }
  });
  const f = (label: string, el: React.ReactNode, error?: string, wide?: boolean) => (
    <div className={wide ? "space-y-1.5 sm:col-span-2" : "space-y-1.5"}>
      <Label className="text-xs font-semibold uppercase tracking-wider">{label}</Label>
      {el}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
  return (
    <section className="bg-surface py-16">
      <div className="container-km max-w-3xl">
        <h1 className="heading-brand text-3xl">Libro de reclamaciones</h1>
        <p className="mt-2 text-sm text-muted-foreground">{SITE.legalName} · RUC {SITE.ruc} · {SITE.address}</p>
        {done ? (
          <div className="mt-8 rounded-2xl bg-card p-8 text-center shadow-card">
            <CheckCircle2 className="mx-auto h-12 w-12 text-whatsapp" />
            <p className="mt-4 font-semibold">Tu reclamo fue registrado. Te responderemos en un plazo máximo de 15 días hábiles.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-4 rounded-2xl bg-card p-6 shadow-card sm:grid-cols-2">
            {f("Nombre completo", <Input className="h-11" {...register("full_name")} />, errors.full_name?.message, true)}
            {f("Tipo de documento", <select className={selectClass} {...register("document_type")}><option>DNI</option><option>CE</option><option>Pasaporte</option><option>RUC</option></select>)}
            {f("N.° de documento", <Input className="h-11" {...register("document_number")} />, errors.document_number?.message)}
            {f("Correo", <Input className="h-11" type="email" {...register("email")} />, errors.email?.message)}
            {f("Teléfono", <Input className="h-11" {...register("phone")} />, errors.phone?.message)}
            {f("Dirección", <Input className="h-11" {...register("address")} />, undefined, true)}
            {f("Tipo", <select className={selectClass} {...register("kind")}><option value="reclamo">Reclamo (disconformidad con el servicio)</option><option value="queja">Queja (malestar en la atención)</option></select>)}
            {f("Monto reclamado (opcional)", <Input className="h-11" {...register("amount")} />)}
            {f("Servicio contratado", <Input className="h-11" {...register("service")} />, undefined, true)}
            {f("Detalle", <Textarea rows={4} {...register("detail")} />, errors.detail?.message, true)}
            {f("Pedido del consumidor", <Textarea rows={3} {...register("request")} />, errors.request?.message, true)}
            {err && <p className="text-sm text-destructive sm:col-span-2">{err}</p>}
            <Button type="submit" variant="brand" size="lg" className="sm:col-span-2" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />} Enviar reclamo
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
