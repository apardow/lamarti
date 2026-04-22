import type { Metadata } from "next";
import { getAllHitos, agruparHitosPorAnio } from "@/lib/wp/hitos";
import CronologiaAccordion from "@/components/wp/CronologiaAccordion";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cronología",
  description:
    "Cronología histórica de la Corporación José Martí de Concepción. Hitos y momentos clave desde 1990.",
};

export default async function CronologiaPage() {
  const hitos = await getAllHitos();
  const hitosPorAnio = agruparHitosPorAnio(hitos);

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

      <section className="py-16 bg-marti-gray">
        <div className="max-w-5xl mx-auto px-4">
          <CronologiaAccordion data={hitosPorAnio} />
        </div>
      </section>
    </>
  );
}
