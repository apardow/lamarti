export interface Imagen {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ImagenConSizes extends Imagen {
  sizes: {
    thumbnail?: Imagen;
    medium?: Imagen;
    large?: Imagen;
    full: Imagen;
  };
}

export interface TerminoTaxonomia {
  id: number;
  nombre: string;
  slug: string;
}

export interface Noticia {
  id: number;
  slug: string;
  titulo: string;
  excerpt: string;
  contenido: string;
  fechaPublicacion: Date;
  imagen: ImagenConSizes | null;
  categoria: TerminoTaxonomia | null;
  destacada: boolean;
}

export interface Convocatoria {
  id: number;
  slug: string;
  titulo: string;
  excerpt: string;
  contenido: string;
  imagen: ImagenConSizes | null;
  tipo: TerminoTaxonomia | null;
  fechaEvento: Date;
  finalizada: boolean;
  linkInscripcion: string | null;
  lugar: string | null;
  cupos: number | null;
}

export interface Hito {
  id: number;
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: ImagenConSizes | null;
  anio: number;
}
