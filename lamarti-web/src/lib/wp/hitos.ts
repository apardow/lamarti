import { wpFetch } from "./client";
import type { WPHitoRaw } from "./types";
import type { Hito } from "./domain";
import { mapHito } from "./mappers";

const PER_PAGE = 100;

async function getHitosBatch(page: number, perPage: number): Promise<Hito[]> {
  const raw = await wpFetch<WPHitoRaw[]>("/wp/v2/hitos", {
    revalidate: 3600,
    tags: ["hitos"],
    searchParams: {
      _embed: "true",
      per_page: perPage,
      page,
    },
  });
  return raw.map(mapHito);
}

export async function getHitos(): Promise<Hito[]> {
  return getAllHitos();
}

export async function getAllHitos(): Promise<Hito[]> {
  let allHitos: Hito[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const batch = await getHitosBatch(page, PER_PAGE);
      allHitos = [...allHitos, ...batch];
      hasMore = batch.length === PER_PAGE;
      page++;
    } catch {
      // WP devuelve 400 al pedir página fuera de rango — fin de paginación.
      hasMore = false;
    }
  }

  return allHitos.sort((a, b) => a.anio - b.anio);
}

export interface HitosPorAnio {
  anio: number;
  hitos: Hito[];
  imagenRepresentativa: string | null;
}

export function agruparHitosPorAnio(hitos: Hito[]): HitosPorAnio[] {
  const grupos = new Map<number, Hito[]>();

  for (const hito of hitos) {
    const lista = grupos.get(hito.anio) ?? [];
    lista.push(hito);
    grupos.set(hito.anio, lista);
  }

  const resultado: HitosPorAnio[] = [];
  for (const [anio, lista] of grupos) {
    const conImagen = lista.filter((h) => h.imagen !== null);
    const elegido = conImagen.length > 0
      ? conImagen[Math.floor(Math.random() * conImagen.length)]
      : null;
    resultado.push({
      anio,
      hitos: lista,
      imagenRepresentativa: elegido?.imagen?.url ?? null,
    });
  }

  return resultado.sort((a, b) => a.anio - b.anio);
}
