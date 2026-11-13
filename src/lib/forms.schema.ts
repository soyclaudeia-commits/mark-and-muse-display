import { z } from "zod";

export const SERVICE_TYPES = ["Paquete turístico", "Hospedaje", "Crucero", "Seguro de viaje", "Otro"] as const;

const optionalDate = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida")
  .optional()
  .or(z.literal("").transform(() => undefined));

export const quoteSchema = z.object({
  full_name: z.string().trim().min(2, "Ingresa tu nombre completo").max(120),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: z.string().trim().min(6, "Ingresa un teléfono válido").max(30).regex(/^[0-9+()\s-]+$/, "Solo números"),
  service_type: z.enum(SERVICE_TYPES),
  origin: z.string().trim().max(120).optional(),
  destination: z.string().trim().max(160).optional(),
  departure_date: optionalDate,
  return_date: optionalDate,
  adults: z.coerce.number().int().min(1).max(50),
  children: z.coerce.number().int().min(0).max(50),
  budget: z.string().trim().max(80).optional(),
  comments: z.string().trim().max(2000).optional(),
  package_title: z.string().trim().max(200).optional(),
});
export type QuoteInput = z.input<typeof quoteSchema>;

export const complaintSchema = z.object({
  full_name: z.string().trim().min(2, "Ingresa tu nombre").max(120),
  document_type: z.enum(["DNI", "CE", "Pasaporte", "RUC"]),
  document_number: z.string().trim().min(6, "Documento inválido").max(20),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: z.string().trim().min(6, "Teléfono inválido").max(30),
  address: z.string().trim().max(200).optional(),
  kind: z.enum(["reclamo", "queja"]),
  service: z.string().trim().max(200).optional(),
  amount: z.string().trim().max(40).optional(),
  detail: z.string().trim().min(5, "Describe lo ocurrido").max(3000),
  request: z.string().trim().min(2, "Indica tu pedido").max(2000),
});
export type ComplaintInput = z.input<typeof complaintSchema>;
