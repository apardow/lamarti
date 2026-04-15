import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Users } from "lucide-react";
import {
  getConvocatoriaBySlug,
  getAllConvocatoriaSlugs,
} from "@/lib/wp/convocatorias";
import { formatDateEs } from "@/lib/wp/mappers";
import ImagenDestacada from "@/components/wp/ImagenDestacada";
import WPContent from "@/components/wp/WPContent";
import BadgeFinalizada from "@/components/wp/BadgeFinalizada";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllConvocatoriaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const conv = await getConvocatoriaBySlug(slug);

  if (!conv) {
    return { title: "Convocatoria no encontrada" };
  }

  return {
    title: conv.titulo,
    description: conv.excerpt,
    openGraph: {
      title: conv.titulo,
      description: conv.excerpt,
      images: conv.imagen ? [conv.imagen.url] : [],
    },
  };
}

export default async function ConvocatoriaDetailPage({ params }: Props) {
  const { slug } = await params;
  const conv = await getConvocatoriaBySlug(slug);

  if (!conv) notFound();

  return (
    <>
      {/* Banner */}
      <section className="relative min-h-[50vh] flex items-end pt-20 pb-12 overflow-hidden">
        {conv.imagen ? (
          <div className="absolute inset-0 z-0">
            <ImagenDestacada
              imagen={conv.imagen}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-marti-black/90 via-marti-black/50 to-marti-black/20" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-marti-blue" />
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
          <div className="flex items-center gap-3 mb-4">
            {conv.tipo && (
              <span className="inline-block bg-marti-orange/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {conv.tipo.nombre}
              </span>
            )}
            {conv.finalizada && <BadgeFinalizada />}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-4 leading-tight">
            {conv.titulo}
          </h1>
        </div>
      </section>

      {/* Info + Contenido */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {/* Metadata card */}
          <div className="bg-marti-gray rounded-2xl p-6 mb-10 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-marti-orange" />
              <span className="font-bold">
                {formatDateEs(conv.fechaEvento)}
              </span>
            </div>
            {conv.lugar && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-marti-orange" />
                <span>{conv.lugar}</span>
              </div>
            )}
            {conv.cupos != null && (
              <div className="flex items-center gap-2">
                <Users size={16} className="text-marti-orange" />
                <span>{conv.cupos} cupos</span>
              </div>
            )}
          </div>

          {conv.linkInscripcion && !conv.finalizada && (
            <div className="mb-10">
              <a
                href={conv.linkInscripcion}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-marti-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-marti-red transition-colors shadow-lg"
              >
                Inscribirse
              </a>
            </div>
          )}

          <WPContent html={conv.contenido} />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/convocatorias"
              className="inline-flex items-center gap-2 text-marti-blue font-bold hover:text-marti-orange transition-colors"
            >
              <ArrowLeft size={18} /> Volver a convocatorias
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
