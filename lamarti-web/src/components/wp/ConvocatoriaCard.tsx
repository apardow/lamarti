import Link from "next/link";
import { MapPin, Calendar, Users } from "lucide-react";
import type { Convocatoria } from "@/lib/wp/domain";
import { formatDateEs } from "@/lib/wp/mappers";
import ImagenDestacada from "./ImagenDestacada";
import BadgeFinalizada from "./BadgeFinalizada";

interface ConvocatoriaCardProps {
  convocatoria: Convocatoria;
}

export default function ConvocatoriaCard({
  convocatoria,
}: ConvocatoriaCardProps) {
  return (
    <article
      className={`bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 group transition-all duration-300 hover:-translate-y-1 ${
        convocatoria.finalizada ? "opacity-70" : ""
      }`}
    >
      <div className="h-56 overflow-hidden relative">
        <ImagenDestacada
          imagen={convocatoria.imagen}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {convocatoria.tipo && (
            <span className="bg-marti-orange/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {convocatoria.tipo.nombre}
            </span>
          )}
          {convocatoria.finalizada && <BadgeFinalizada />}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-xl font-display font-black text-marti-black mb-3 leading-tight line-clamp-2">
          <Link
            href={`/convocatorias/${convocatoria.slug}`}
            className="hover:text-marti-blue transition-colors"
          >
            {convocatoria.titulo}
          </Link>
        </h3>

        <div className="space-y-2 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-marti-orange" />
            <span>{formatDateEs(convocatoria.fechaEvento)}</span>
          </div>
          {convocatoria.lugar && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-marti-orange" />
              <span className="line-clamp-1">{convocatoria.lugar}</span>
            </div>
          )}
          {convocatoria.cupos != null && (
            <div className="flex items-center gap-2">
              <Users size={14} className="text-marti-orange" />
              <span>{convocatoria.cupos} cupos</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed line-clamp-2 mb-4">
          {convocatoria.excerpt}
        </p>

        <div className="flex items-center gap-3">
          <Link
            href={`/convocatorias/${convocatoria.slug}`}
            className="text-marti-orange font-bold text-sm hover:text-marti-red transition-colors"
          >
            Ver detalles →
          </Link>
          {convocatoria.linkInscripcion && !convocatoria.finalizada && (
            <a
              href={convocatoria.linkInscripcion}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-marti-orange text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-marti-red transition-colors"
            >
              Inscribirse
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
