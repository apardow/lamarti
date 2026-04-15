import type { Metadata } from "next";
import { getHitos } from "@/lib/wp/hitos";
import HitoTimelineItem from "@/components/wp/HitoTimelineItem";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cronología",
  description:
    "Cronología histórica de la Corporación José Martí de Concepción. Hitos y momentos clave desde 1990.",
};

export default async function CronologiaPage() {
  const hitos = await getHitos();

  return (
    <>
      {/* Banner */}
      <section className="bg-marti-blue pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4">
            Cronología
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Los hitos más importantes en la historia de La Martí, desde nuestros
            orígenes hasta hoy.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-marti-gray">
        <div className="max-w-5xl mx-auto px-4">
          {hitos.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-20">
              No hay hitos registrados aún.
            </p>
          ) : (
            <div className="relative">
              {/* Vertical line - desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-marti-blue/20 -translate-x-1/2" />
              {/* Vertical line - mobile */}
              <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-marti-blue/20" />

              <div className="space-y-12">
                {hitos.map((hito, index) => (
                  <HitoTimelineItem key={hito.id} hito={hito} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
