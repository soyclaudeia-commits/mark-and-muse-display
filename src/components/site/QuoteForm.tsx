import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitQuote } from "@/lib/forms.functions";
import { quoteSchema, SERVICE_TYPES, type QuoteInput } from "@/lib/forms.schema";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const selectClass =
  "flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export function QuoteForm({ defaults, compact }: { defaults?: Partial<QuoteInput>; compact?: boolean }) {
  const send = useServerFn(submitQuote);
  const [done, setDone] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { service_type: "Paquete turístico", adults: 2, children: 0, ...defaults },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await send({ data: values });
      setDone(values.full_name.split(" ")[0] ?? "");
      reset({ service_type: "Paquete turístico", adults: 2, children: 0 });
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Ocurrió un error. Inténtalo nuevamente.");
    }
  });

  if (done !== null) {
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-card" role="status">
        <CheckCircle2 className="mx-auto h-14 w-14 text-whatsapp" />
        <h3 className="heading-brand mt-4 text-xl">¡Gracias{done ? `, ${done}` : ""}!</h3>
        <p className="mt-2 text-muted-foreground">
          Recibimos tu solicitud de cotización. Un asesor de KM Viajes y Aventura te contactará muy pronto.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="outline" onClick={() => setDone(null)}>Enviar otra cotización</Button>
          <Button asChild variant="whatsapp">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Escríbenos ya</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("rounded-2xl bg-card p-6 shadow-card sm:p-8", compact && "p-5")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre completo" error={errors.full_name?.message} className="sm:col-span-2">
          <Input className="h-11" autoComplete="name" {...register("full_name")} />
        </Field>
        <Field label="Correo" error={errors.email?.message}>
          <Input className="h-11" type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field label="Teléfono / WhatsApp" error={errors.phone?.message}>
          <Input className="h-11" type="tel" autoComplete="tel" placeholder="+51 9XX XXX XXX" {...register("phone")} />
        </Field>
        <Field label="Tipo de servicio" error={errors.service_type?.message}>
          <select className={selectClass} {...register("service_type")}>
            {SERVICE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Destino" error={errors.destination?.message}>
          <Input className="h-11" placeholder="Ej. Cusco, Cancún…" {...register("destination")} />
        </Field>
        <Field label="Fecha de salida" error={errors.departure_date?.message}>
          <Input className="h-11" type="date" {...register("departure_date")} />
        </Field>
        <Field label="Fecha de regreso" error={errors.return_date?.message}>
          <Input className="h-11" type="date" {...register("return_date")} />
        </Field>
        <Field label="Adultos" error={errors.adults?.message}>
          <Input className="h-11" type="number" min={1} max={50} {...register("adults")} />
        </Field>
        <Field label="Niños" error={errors.children?.message}>
          <Input className="h-11" type="number" min={0} max={50} {...register("children")} />
        </Field>
        <Field label="Presupuesto aproximado" error={errors.budget?.message} className="sm:col-span-2">
          <select className={selectClass} {...register("budget")}>
            <option value="">Selecciona un rango (opcional)</option>
            <option>Menos de S/ 1,500</option>
            <option>S/ 1,500 – S/ 3,500</option>
            <option>S/ 3,500 – S/ 7,000</option>
            <option>S/ 7,000 – S/ 15,000</option>
            <option>Más de S/ 15,000</option>
          </select>
        </Field>
        <Field label="Comentarios" error={errors.comments?.message} className="sm:col-span-2">
          <Textarea rows={4} placeholder="Cuéntanos qué tipo de viaje sueñas…" {...register("comments")} />
        </Field>
        <input type="hidden" {...register("origin")} />
        <input type="hidden" {...register("package_title")} />
      </div>
      {serverError && <p className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{serverError}</p>}
      <Button type="submit" variant="brand" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />} Solicitar cotización
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Al enviar aceptas nuestra política de privacidad. Te responderemos en horario de atención.
      </p>
    </form>
  );
}
