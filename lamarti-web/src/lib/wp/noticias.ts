import { wpFetch } from "./client";
import type { WPNoticiaRaw } from "./types";
import type { Noticia } from "./domain";
import { mapNoticia } from "./mappers";

export async function getNoticias(opts?: {
  page?: number;
  perPage?: number;
}): Promise<Noticia[]> {
  const raw = await wpFetch<WPNoticiaRaw[]>("/wp/v2/noticias", {
    revalidate: 60,
    tags: ["noticias"],
    searchParams: {
      _embed: "true",
      per_page: opts?.perPage ?? 12,
      page: opts?.page ?? 1,
      orderby: "date",
      order: "desc",
    },
  });

  return raw.map(mapNoticia);
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const raw = await wpFetch<WPNoticiaRaw[]>("/wp/v2/noticias", {
    revalidate: 60,
    tags: ["noticias"],
    searchParams: {
      _embed: "true",
      slug,
    },
  });

  if (raw.length === 0) return null;
  return mapNoticia(raw[0]);
}

export async function getAllNoticiaSlugs(): Promise<string[]> {
  const raw = await wpFetch<WPNoticiaRaw[]>("/wp/v2/noticias", {
    revalidate: 60,
    tags: ["noticias"],
    searchParams: {
      per_page: 100,
      _fields: "slug",
    },
  });

  return raw.map((n) => n.slug);
}

export async function getNoticiasDestacadas(limit: number = 3): Promise<Noticia[]> {
  // Traer todas y filtrar en memoria ya que ACF meta queries no siempre funcionan en REST
  const raw = await wpFetch<WPNoticiaRaw[]>("/wp/v2/noticias", {
    revalidate: 60,
    tags: ["noticias"],
    searchParams: {
      _embed: "true",
      per_page: 100,
      orderby: "date",
      order: "desc",
    },
  });

  return raw
    .filter((n) => n.acf.destacada)
    .slice(0, limit)
    .map(mapNoticia);
}
