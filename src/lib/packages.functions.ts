import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { publicDb } from "./public-db.server";

const categorySchema = z.enum(["nacional", "internacional", "crucero", "hotel"]);

export const listPackages = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ category: categorySchema.optional() }).parse(d ?? {}))
  .handler(async ({ data }) => {
    let q = publicDb().from("packages").select("*").eq("is_published", true).order("sort_order");
    if (data.category) q = q.eq("category", data.category);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const listOffers = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicDb()
    .from("packages")
    .select("*")
    .eq("is_published", true)
    .eq("is_offer", true)
    .gt("offer_ends_at", new Date().toISOString())
    .order("offer_ends_at");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPackage = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const { data: row, error } = await publicDb()
      .from("packages")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });
