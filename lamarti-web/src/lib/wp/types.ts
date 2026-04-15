/** Campos renderizados de WordPress */
export interface WPRenderedField {
  rendered: string;
  protected?: boolean;
}

/** Tamaño de imagen en media_details */
export interface WPMediaSize {
  source_url: string;
  width: number;
  height: number;
  mime_type?: string;
}

/** Featured media embebida con _embed */
export interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      thumbnail?: WPMediaSize;
      medium?: WPMediaSize;
      medium_large?: WPMediaSize;
      large?: WPMediaSize;
      "1536x1536"?: WPMediaSize;
      full?: WPMediaSize;
    };
  };
}

/** Término de taxonomía embebido */
export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

/** Estructura embebida (_embed) */
export interface WPEmbedded {
  "wp:featuredmedia"?: WPFeaturedMedia[];
  "wp:term"?: WPTerm[][];
}

/** Respuesta raw de /wp-json/wp/v2/noticias */
export interface WPNoticiaRaw {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPRenderedField;
  content: WPRenderedField;
  excerpt?: WPRenderedField;
  featured_media: number;
  "categorias-noticia": number[];
  class_list?: string[];
  acf: {
    destacada: boolean;
  };
  _embedded?: WPEmbedded;
}

/** Respuesta raw de /wp-json/wp/v2/convocatorias */
export interface WPConvocatoriaRaw {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  title: WPRenderedField;
  content: WPRenderedField;
  featured_media: number;
  "tipos-convocatoria": number[];
  acf: {
    fecha_evento: string;
    link_inscripcion: string;
    lugar: string;
    cupos: number | null;
  };
  _embedded?: WPEmbedded;
}

/** Respuesta raw de /wp-json/wp/v2/hitos */
export interface WPHitoRaw {
  id: number;
  slug: string;
  status: string;
  type: string;
  title: WPRenderedField;
  content: WPRenderedField;
  featured_media: number;
  acf: {
    anio: number;
  };
  _embedded?: WPEmbedded;
}
