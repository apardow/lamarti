import Link from "next/link";

export default function ConvocatoriaNotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-marti-gray pt-20">
      <div className="text-center">
        <h1 className="text-4xl font-display font-black text-marti-black mb-4">
          Convocatoria no encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          La convocatoria que buscas no existe o fue eliminada.
        </p>
        <Link
          href="/convocatorias"
          className="bg-marti-blue text-white px-8 py-3 rounded-full font-bold hover:bg-marti-orange transition-colors"
        >
          Ver todas las convocatorias
        </Link>
      </div>
    </section>
  );
}
