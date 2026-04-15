import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Nuestra Historia",
  description:
    "Desde 1990, la Corporación José Martí trabaja por la solidaridad con Cuba y la unidad de los pueblos de Nuestra América desde Concepción, Chile.",
  openGraph: {
    images: ["/images/galeria/5.png"],
  },
};

export default function HistoriaPage() {
  return (
    <>
      {/* Banner */}
      <section className="relative min-h-[50vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/galeria/5.png"
            alt="Nuestra Historia"
            fill
            className="object-cover"
            preload
          />
          <div className="absolute inset-0 bg-gradient-to-r from-marti-black/80 via-marti-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="inline-flex items-center gap-2 bg-marti-orange/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-lg">
            Desde 1990
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-8 leading-[1.1] text-balance">
            Nuestra <span className="text-marti-orange">Historia</span>
          </h1>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-20 md:py-28 bg-marti-warm">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-marti-black mb-10 leading-tight">
            Más de Cuatro Décadas{" "}
            <span className="text-marti-red">de Solidaridad</span>
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              La trayectoria de nuestra organización abarca más de 40 años de
              labor ininterrumpida, marcada por cientos de actividades en
              diversos espacios y tiempos. Aunque nuestras raíces son profundas,
              el hito fundacional se sitúa en{" "}
              <strong className="text-marti-black">julio de 1990</strong>, con
              la creación del Comité de Solidaridad con Cuba.
            </p>
            <p>
              Este surgimiento coincidió con el inicio del &ldquo;Período
              Especial&rdquo; en la isla, un momento de extrema complejidad
              económica donde un grupo de compañeros y compañeras, unidos por el
              amor a Cuba, decidieron organizarse para brindar apoyo ante el
              &ldquo;doble bloqueo&rdquo;.
            </p>
          </div>
        </div>
      </section>

      {/* Evolución e Identidad */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-marti-black mb-12 leading-tight">
            Evolución <span className="text-marti-red">e Identidad</span>
          </h2>
          <div className="space-y-10">
            <div className="border-l-4 border-marti-red pl-6">
              <h3 className="text-xl font-display font-bold text-marti-black mb-2">
                De Comité a Asociación
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                En 1994, la organización se transforma en la Asociación Cultural
                José Martí, dando un salto de continuidad con nuevos militantes.
              </p>
            </div>
            <div className="border-l-4 border-marti-blue pl-6">
              <h3 className="text-xl font-display font-bold text-marti-black mb-2">
                Renovación Generacional
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Con el tiempo, el colectivo ha integrado a jóvenes estudiantes
                universitarios y secundarios, aportando nuevas fuerzas y
                creatividad al quehacer solidario.
              </p>
            </div>
            <div className="border-l-4 border-marti-red pl-6">
              <h3 className="text-xl font-display font-bold text-marti-black mb-2">
                Definición Política
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nos definimos como una organización{" "}
                <strong>
                  Bolivariana, Martiana, Guevarista, Allendista y Fidelista
                </strong>
                , sintiéndonos parte de la Patria Grande.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hitos y Proyectos Emblemáticos */}
      <section className="py-20 md:py-28 bg-marti-gray">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-marti-black mb-12 leading-tight">
            Hitos y Proyectos{" "}
            <span className="text-marti-red">Emblemáticos</span>
          </h2>
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-display font-bold text-marti-blue mb-3">
                Brigada Violeta Parra
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                En 1993, conformamos esta brigada de trabajos voluntarios que
                viajó a Cuba en pleno periodo especial, sentando las bases de lo
                que hoy son las Brigadas Sudamericanas de Solidaridad.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-display font-bold text-marti-blue mb-3">
                Encuentros Nacionales
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Como parte del Movimiento Chileno de Solidaridad, hemos
                organizado los Encuentros Nacionales de{" "}
                <strong>1997, 2004 y 2011</strong>. Destaca el evento de 2004 en
                el Foro de la Universidad de Concepción, que contó con la
                presencia de figuras como{" "}
                <strong>Harry Villegas (&ldquo;Pombo&rdquo;)</strong>, la{" "}
                <strong>Dra. Aleida Guevara</strong> y el trovador{" "}
                <strong>Gerardo Alfonso</strong>.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-display font-bold text-marti-blue mb-3">
                Formación Académica y Política
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Hemos impulsado la formación de compañeros en la{" "}
                <strong>
                  Escuela Latinoamericana de Medicina (ELAM)
                </strong>{" "}
                en Cuba y participado activamente en instancias internacionales
                como el ALBA de los Movimientos Sociales y la{" "}
                <strong>Escuela Florestan Fernandes del MST</strong> en Brasil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Autogestión */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-marti-black mb-10 leading-tight">
            Autogestión <span className="text-marti-red">y Compromiso</span>
          </h2>
          <div className="bg-marti-warm rounded-2xl p-8 md:p-12 border border-red-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              Somos una organización autónoma. Nuestro financiamiento proviene
              exclusivamente de la <strong>&ldquo;fuerza propia&rdquo;</strong>:
              cotizaciones de miembros, aportes de amigos comprometidos y
              actividades de autogestión como peñas, rifas y ventas culturales.
              Esta práctica demuestra que es posible sostener la actividad
              militante con disciplina y corazón.
            </p>
          </div>
        </div>
      </section>

      {/* Memoria y Legado */}
      <section className="py-20 md:py-28 bg-marti-gray">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-marti-black mb-6 leading-tight">
            Memoria <span className="text-marti-red">y Legado</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            Honramos la memoria de quienes forjaron este camino y ya no están
            físicamente, representados en figuras como:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-display font-bold text-marti-black mb-3">
                Tadeo Pavisich Brandesich
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Referente intelectual y moral desde nuestros inicios.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-display font-bold text-marti-black mb-3">
                Francisco &ldquo;Panchito&rdquo; Contreras
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Joven líder y estudiante de medicina en Cuba, cuyo compromiso y
                alegría siguen estimulando nuestro trabajo diario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-marti-blue">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            href="/convocatorias"
            className="inline-flex items-center gap-2 text-white font-black text-lg hover:text-marti-orange transition-all group"
          >
            CONOCE NUESTRAS CONVOCATORIAS{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
