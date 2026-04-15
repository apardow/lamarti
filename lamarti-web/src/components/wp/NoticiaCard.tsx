import Link from "next/link";
import type { Noticia } from "@/lib/wp/domain";
import { formatDateEs } from "@/lib/wp/mappers";
import ImagenDestacada from "./ImagenDestacada";

interface NoticiaCardProps {
  noticia: Noticia;
}

export default function NoticiaCard({ noticia }: NoticiaCardProps) {
  return (
    <article className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
      <div className="h-56 overflow-hidden relative">
        <ImagenDestacada
          imagen={noticia.imagen}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {noticia.categoria && (
          <div className="absolute top-4 left-4">
            <span className="bg-marti-blue/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {noticia.categoria.nombre}
            </span>
          </div>
        )}
      </div>
      <div className="p-8">
        <time className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {formatDateEs(noticia.fechaPublicacion)}
        </time>
        <h3 className="text-xl font-display font-black text-marti-black mt-2 mb-3 leading-tight line-clamp-2">
          <Link href={`/noticias/${noticia.slug}`} className="hover:text-marti-blue transition-colors">
            {noticia.titulo}
          </Link>
        </h3>
        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {noticia.excerpt}
        </p>
        <Link
          href={`/noticias/${noticia.slug}`}
          className="text-marti-orange font-bold text-sm hover:text-marti-red transition-colors"
        >
          Leer más →
        </Link>
      </div>
    </article>
  );
}
