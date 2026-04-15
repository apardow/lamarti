import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import ImpactAreas from "@/components/ImpactAreas";
import NoticiaCard from "@/components/wp/NoticiaCard";
import { getNoticiasDestacadas } from "@/lib/wp/noticias";

export default async function HomePage() {
  const destacadas = await getNoticiasDestacadas(6);

  return (
    <>
      <Hero />
      <Stats />
      <Testimonial />
      <ImpactAreas />

      {/* Noticias Destacadas — datos desde WP */}
      {destacadas.length > 0 && (
        <section className="py-24 bg-marti-gray">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-black text-marti-blue mb-6">
                Últimas Noticias Destacadas
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Mantente al día con las novedades de La Martí
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destacadas.map((noticia) => (
                <NoticiaCard key={noticia.id} noticia={noticia} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 text-marti-orange font-black text-lg hover:gap-4 transition-all"
              >
                Ver todas las noticias <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
