import type { WPNoticiaRaw, WPConvocatoriaRaw, WPHitoRaw, WPEmbedded } from "./types";
import type { ImagenConSizes, TerminoTaxonomia, Noticia, Convocatoria, Hito } from "./domain";

/** Normaliza "20260416" → Date */
export function parseAcfYmdDate(raw: string): Date {
  if (!raw || raw.length !== 8) {
    throw new Error(`Invalid ACF date format: "${raw}"`);
  }
  const year = parseInt(raw.slice(0, 4), 10);
  const month = parseInt(raw.slice(4, 6), 10) - 1;
  const day = parseInt(raw.slice(6, 8), 10);
  return new Date(year, month, day);
}

/** Extrae la imagen destacada embebida o retorna null */
export function mapFeaturedMedia(embedded?: WPEmbedded): ImagenConSizes | null {
  const media = embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;

  const sizes = media.media_details?.sizes;
  const full = sizes?.full ?? {
    source_url: media.source_url,
    width: media.media_details.width,
    height: media.media_details.height,
  };

  return {
    url: media.source_url,
    alt: media.alt_text || "",
    width: media.media_details.width,
    height: media.media_details.height,
    sizes: {
      thumbnail: sizes?.thumbnail
        ? { url: sizes.thumbnail.source_url, alt: media.alt_text || "", width: sizes.thumbnail.width, height: sizes.thumbnail.height }
        : undefined,
      medium: sizes?.medium
        ? { url: sizes.medium.source_url, alt: media.alt_text || "", width: sizes.medium.width, height: sizes.medium.height }
        : undefined,
      large: sizes?.large
        ? { url: sizes.large.source_url, alt: media.alt_text || "", width: sizes.large.width, height: sizes.large.height }
        : undefined,
      full: { url: full.source_url, alt: media.alt_text || "", width: full.width, height: full.height },
    },
  };
}

/** Extrae el primer término de taxonomía embebido */
export function mapFirstTerm(embedded?: WPEmbedded): TerminoTaxonomia | null {
  const term = embedded?.["wp:term"]?.[0]?.[0];
  if (!term) return null;
  return {
    id: term.id,
    nombre: term.name,
    slug: term.slug,
  };
}

/** Quita tags HTML y decodifica entidades básicas */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&hellip;/g, "\u2026")
    .trim();
}

/** Formatea una fecha en español */
export function formatDateEs(date: Date): string {
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function mapNoticia(raw: WPNoticiaRaw): Noticia {
  return {
    id: raw.id,
    slug: raw.slug,
    titulo: stripHtml(raw.title.rendered),
    excerpt: raw.excerpt ? stripHtml(raw.excerpt.rendered) : stripHtml(raw.content.rendered).slice(0, 200),
    contenido: raw.content.rendered,
    fechaPublicacion: new Date(raw.date),
    imagen: mapFeaturedMedia(raw._embedded),
    categoria: mapFirstTerm(raw._embedded),
    destacada: raw.acf.destacada,
  };
}

export function mapConvocatoria(raw: WPConvocatoriaRaw): Convocatoria {
  const fechaEvento = parseAcfYmdDate(raw.acf.fecha_evento);
  return {
    id: raw.id,
    slug: raw.slug,
    titulo: stripHtml(raw.title.rendered),
    excerpt: stripHtml(raw.content.rendered).slice(0, 200),
    contenido: raw.content.rendered,
    imagen: mapFeaturedMedia(raw._embedded),
    tipo: mapFirstTerm(raw._embedded),
    fechaEvento,
    finalizada: fechaEvento < new Date(),
    linkInscripcion: raw.acf.link_inscripcion || null,
    lugar: raw.acf.lugar || null,
    cupos: raw.acf.cupos,
  };
}

export function mapHito(raw: WPHitoRaw): Hito {
  return {
    id: raw.id,
    slug: raw.slug,
    titulo: stripHtml(raw.title.rendered),
    descripcion: raw.content.rendered,
    imagen: mapFeaturedMedia(raw._embedded),
    anio: raw.acf.anio,
  };
}
