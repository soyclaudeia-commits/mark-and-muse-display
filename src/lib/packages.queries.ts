import { queryOptions } from "@tanstack/react-query";
import { getPackage, listOffers, listPackages } from "./packages.functions";
import type { PackageCategory } from "./packages";

export const packagesQuery = (category?: PackageCategory) =>
  queryOptions({
    queryKey: ["packages", category ?? "all"],
    queryFn: () => listPackages({ data: { category } }),
    staleTime: 60_000,
  });

export const offersQuery = () =>
  queryOptions({ queryKey: ["offers"], queryFn: () => listOffers(), staleTime: 60_000 });

export const packageQuery = (slug: string) =>
  queryOptions({
    queryKey: ["package", slug],
    queryFn: () => getPackage({ data: { slug } }),
    staleTime: 60_000,
  });
