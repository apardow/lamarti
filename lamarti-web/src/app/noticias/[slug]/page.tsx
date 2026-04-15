import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getNoticiaBySlug, getAllNoticiaSlugs } from "@/lib/wp/noticias";
import { formatDateEs } from "@/lib/wp/mappers";
import ImagenDestacada from "@/components/wp/ImagenDestacada";
import WPContent from "@/components/wp/WPContent";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllNoticiaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);

  if (!noticia) {
    return { title: "Noticia no encontrada" };
  }

  return {
    title: noticia.titulo,
    description: noticia.excerpt,
    openGraph: {
      title: noticia.titulo,
      description: noticia.excerpt,
      type: "article",
      publishedTime: noticia.fechaPublicacion.toISOString(),
      images: noticia.imagen ? [noticia.imagen.url] : [],
    },
  };
}

export default async function NoticiaDetailPage({ params }: Props) {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);

  if (!noticia) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    description: noticia.excerpt,
    datePublished: noticia.fechaPublicacion.toISOString(),
    image: noticia.imagen?.url,
    author: {
      "@type": "Organization",
      name: "Corporación José Martí",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Banner con imagen */}
      <section className="relative min-h-[50vh] flex items-end pt-20 pb-12 overflow-hidden">
        {noticia.imagen ? (
          <div className="absolute inset-0 z-0">
            <ImagenDestacada
              imagen={noticia.imagen}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-marti-black/90 via-marti-black/50 to-marti-black/20" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-marti-blue" />
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
          {noticia.categoria && (
            <span className="inline-block bg-marti-orange/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {noticia.categoria.nombre}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-4 leading-tight">
            {noticia.titulo}
          </h1>
          <time className="text-white/60 text-sm font-bold uppercase tracking-widest">
            {formatDateEs(noticia.fechaPublicacion)}
          </time>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <WPContent html={noticia.contenido} />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-marti-blue font-bold hover:text-marti-orange transition-colors"
            >
              <ArrowLeft size={18} /> Volver a noticias
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
