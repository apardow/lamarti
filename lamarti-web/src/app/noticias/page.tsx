import type { Metadata } from "next";
import { getNoticias } from "@/lib/wp/noticias";
import NoticiaCard from "@/components/wp/NoticiaCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Últimas noticias de la Corporación José Martí de Concepción. Solidaridad, cultura y política latinoamericana.",
};

export default async function NoticiasPage() {
  const noticias = await getNoticias({ perPage: 12 });

  return (
    <>
      {/* Banner */}
      <section className="bg-marti-blue pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4">
            Noticias
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Información, declaraciones y noticias del quehacer solidario de La
            Martí y el movimiento de solidaridad con Cuba.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-marti-gray">
        <div className="max-w-7xl mx-auto px-4">
          {noticias.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-20">
              No hay noticias publicadas aún.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticias.map((noticia) => (
                <NoticiaCard key={noticia.id} noticia={noticia} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
