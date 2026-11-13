import type { Database } from "@/integrations/supabase/types";

export type PackageRow = Database["public"]["Tables"]["packages"]["Row"];
export type PackageCategory = "nacional" | "internacional" | "crucero" | "hotel";
export type ItineraryDay = { day: number; title: string; description: string };

export const CATEGORY_LABEL: Record<PackageCategory, string> = {
  nacional: "Paquete nacional",
  internacional: "Paquete internacional",
  crucero: "Crucero",
  hotel: "Hospedaje",
};

export function itineraryOf(p: Pick<PackageRow, "itinerary">): ItineraryDay[] {
  return Array.isArray(p.itinerary) ? (p.itinerary as unknown as ItineraryDay[]) : [];
}
