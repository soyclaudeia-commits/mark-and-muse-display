import { createServerFn } from "@tanstack/react-start";
import { complaintSchema, quoteSchema } from "./forms.schema";
import { publicDb } from "./public-db.server";

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((d) => quoteSchema.parse(d))
  .handler(async ({ data }) => {
    const { error } = await publicDb().from("quote_requests").insert({
      ...data,
      origin: data.origin || null,
      destination: data.destination || null,
      departure_date: data.departure_date || null,
      return_date: data.return_date || null,
      budget: data.budget || null,
      comments: data.comments || null,
      package_title: data.package_title || null,
    });
    if (error) {
      console.error("quote insert failed", error.message);
      throw new Error("No pudimos registrar tu solicitud. Inténtalo nuevamente.");
    }
    return { ok: true as const };
  });

export const submitComplaint = createServerFn({ method: "POST" })
  .inputValidator((d) => complaintSchema.parse(d))
  .handler(async ({ data }) => {
    const { error } = await publicDb().from("complaints").insert({
      ...data,
      address: data.address || null,
      service: data.service || null,
      amount: data.amount || null,
    });
    if (error) {
      console.error("complaint insert failed", error.message);
      throw new Error("No pudimos registrar tu reclamo. Inténtalo nuevamente.");
    }
    return { ok: true as const };
  });
