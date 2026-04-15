import { wpFetch } from "./client";
import type { WPHitoRaw } from "./types";
import type { Hito } from "./domain";
import { mapHito } from "./mappers";

export async function getHitos(): Promise<Hito[]> {
  const raw = await wpFetch<WPHitoRaw[]>("/wp/v2/hitos", {
    revalidate: 3600,
    tags: ["hitos"],
    searchParams: {
      _embed: "true",
      per_page: 100,
    },
  });

  return raw.map(mapHito).sort((a, b) => a.anio - b.anio);
}
