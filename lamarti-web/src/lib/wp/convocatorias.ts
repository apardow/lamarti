import { wpFetch } from "./client";
import type { WPConvocatoriaRaw } from "./types";
import type { Convocatoria } from "./domain";
import { mapConvocatoria } from "./mappers";

export async function getConvocatorias(): Promise<Convocatoria[]> {
  const raw = await wpFetch<WPConvocatoriaRaw[]>("/wp/v2/convocatorias", {
    revalidate: 60,
    tags: ["convocatorias"],
    searchParams: {
      _embed: "true",
      per_page: 100,
      orderby: "date",
      order: "desc",
    },
  });

  const convocatorias = raw.map(mapConvocatoria);

  // Vigentes primero (por fechaEvento asc), finalizadas después (por fechaEvento desc)
  const vigentes = convocatorias
    .filter((c) => !c.finalizada)
    .sort((a, b) => a.fechaEvento.getTime() - b.fechaEvento.getTime());

  const finalizadas = convocatorias
    .filter((c) => c.finalizada)
    .sort((a, b) => b.fechaEvento.getTime() - a.fechaEvento.getTime());

  return [...vigentes, ...finalizadas];
}

export async function getConvocatoriaBySlug(
  slug: string
): Promise<Convocatoria | null> {
  const raw = await wpFetch<WPConvocatoriaRaw[]>("/wp/v2/convocatorias", {
    revalidate: 60,
    tags: ["convocatorias"],
    searchParams: {
      _embed: "true",
      slug,
    },
  });

  if (raw.length === 0) return null;
  return mapConvocatoria(raw[0]);
}

export async function getAllConvocatoriaSlugs(): Promise<string[]> {
  const raw = await wpFetch<WPConvocatoriaRaw[]>("/wp/v2/convocatorias", {
    revalidate: 60,
    tags: ["convocatorias"],
    searchParams: {
      per_page: 100,
      _fields: "slug",
    },
  });

  return raw.map((c) => c.slug);
}
