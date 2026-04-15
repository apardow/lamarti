import type { Metadata } from "next";
import { getConvocatorias } from "@/lib/wp/convocatorias";
import ConvocatoriaCard from "@/components/wp/ConvocatoriaCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Convocatorias",
  description:
    "Talleres, eventos y voluntariado de la Corporación José Martí de Concepción.",
};

export default async function ConvocatoriasPage() {
  const convocatorias = await getConvocatorias();

  return (
    <>
      {/* Banner */}
      <section className="bg-marti-blue pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4">
            Convocatorias
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Talleres, eventos y oportunidades de voluntariado. Súmate a las
            actividades de La Martí.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-marti-gray">
        <div className="max-w-7xl mx-auto px-4">
          {convocatorias.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-20">
              No hay convocatorias publicadas aún.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {convocatorias.map((conv) => (
                <ConvocatoriaCard key={conv.id} convocatoria={conv} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
