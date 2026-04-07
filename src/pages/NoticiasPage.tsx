import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight, ArrowLeft, CheckCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface Noticia {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  content: React.ReactNode;
}

const noticias: Noticia[] = [
  {
    id: 'declaracion-bloqueo',
    tag: 'Declaración Pública',
    title: 'DECLARACIÓN PÚBLICA: Solidaridad en Acción frente al Bloqueo Genocida',
    excerpt: 'La Asociación Cultural José Martí de Concepción, ante la compleja y peligrosa situación que atraviesa nuestra hermana República de Cuba, declara a la opinión pública nacional e internacional...',
    image: '/images/galeria/nobloqueo.jpg',
    imageAlt: 'No al Bloqueo contra Cuba',
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          La Asociación Cultural José Martí de Concepción, ante la compleja y peligrosa situación que atraviesa nuestra hermana República de Cuba, declara a la opinión pública nacional e internacional lo siguiente:
        </p>

        <h3 className="text-2xl font-display font-extrabold text-marti-black mb-4 mt-10">
          1. Denuncia del Bloqueo como Genocidio Planificado
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Reafirmamos que Cuba enfrenta una ofensiva imperialista sin precedentes, cuyo objetivo es derrotar el proyecto de justicia social iniciado en 1959. Denunciamos que el bloqueo económico no es solo una medida administrativa, sino un <strong className="text-marti-blue">genocidio planificado</strong> que busca asfixiar al pueblo cubano por el "pecado" de ser un símbolo de dignidad, resistencia y antiimperialismo.
        </p>

        <h3 className="text-2xl font-display font-extrabold text-marti-black mb-4 mt-10">
          2. La Solidaridad es la Ternura de los Pueblos
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Entendemos que la subsistencia de la Revolución Cubana depende de su pueblo, pero también de la solidaridad activa de las organizaciones y personas del mundo. En este contexto, La Martí de Concepción ha pasado de la palabra a la acción directa. Tras una exitosa campaña de recolección, nuestro colectivo de voluntarios se ha reunido para clasificar y organizar un importante envío de medicamentos destinado directamente a la isla.
        </p>

        <h3 className="text-2xl font-display font-extrabold text-marti-black mb-4 mt-10">
          3. Compromiso y Líneas de Trabajo
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Nuestra labor no se detiene. Como resultado de nuestra reciente Asamblea Abierta en el Sindicato PETROX, hemos definido cuatro ejes de acción inmediata:
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-4">
            <CheckCircle className="text-marti-orange mt-1 flex-shrink-0" size={22} />
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Solidaridad Política:</strong> Denuncia permanente del imperialismo.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-marti-orange mt-1 flex-shrink-0" size={22} />
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Solidaridad Material:</strong> Gestión de insumos médicos y ayuda directa.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-marti-orange mt-1 flex-shrink-0" size={22} />
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Redes Sociales:</strong> Combate a la desinformación sobre la realidad cubana.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-marti-orange mt-1 flex-shrink-0" size={22} />
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Agitación y Propaganda:</strong> Visibilizar la lucha del pueblo de Martí y Fidel en nuestras calles.
            </p>
          </li>
        </ul>

        <h3 className="text-2xl font-display font-extrabold text-marti-black mb-4 mt-10">
          4. Un llamado a la Unidad
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Fieles al legado de compañeros que nos guían, como Tadeo Pavisich y Francisco "Panchito" Contreras, hacemos un llamado a todos los amigos y amigas de Cuba en Concepción y sus alrededores a sumarse a este esfuerzo solidario.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Hoy se juega en Cuba no solo la soberanía de un país, sino la posibilidad de todo proyecto emancipador en Nuestra América. Como bien nos enseñó el Apóstol: <strong className="text-marti-blue">"Quién se levanta hoy con Cuba se levanta para todos los tiempos"</strong>.
        </p>

        <div className="bg-marti-blue/10 rounded-2xl p-8 text-center">
          <p className="text-xl font-display font-extrabold text-marti-blue mb-2">
            ¡ÚNETE A LA SOLIDARIDAD CON EL HEROICO PUEBLO CUBANO!
          </p>
          <p className="text-xl font-display font-extrabold text-marti-orange mb-4">
            ¡CUBA NO ESTÁ SOLA!
          </p>
          <p className="text-sm text-gray-600 uppercase tracking-widest font-bold">
            Asociación Cultural José Martí de Concepción
          </p>
          <p className="text-sm text-gray-500">Concepción, Chile</p>
        </div>
      </>
    ),
  },
  {
    id: 'medicina-solidaria',
    tag: 'Noticia Destacada',
    title: 'Manos Solidarias: La Martí organiza envío de medicamentos tras exitosa campaña de donaciones',
    excerpt: 'En una jornada marcada por el compromiso ético y la organización colectiva, un grupo de voluntarios y voluntarias de la Asociación Cultural José Martí se reunió para clasificar, inventariar y embalar donaciones de medicamentos...',
    image: '/images/galeria/noticiaMedicinaSolidaria.jpg',
    imageAlt: 'Voluntarios clasificando medicamentos para envío solidario a Cuba',
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>CONCEPCIÓN</strong> — En una jornada marcada por el compromiso ético y la organización colectiva, un grupo de voluntarios y voluntarias de la Asociación Cultural José Martí se reunió para clasificar, inventariar y embalar una importante serie de donaciones de medicamentos recaudados en apoyo al pueblo cubano.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Esta actividad es el resultado directo de la solidaridad de la comunidad penquista, que ha respondido con generosidad ante la compleja situación sanitaria que atraviesa la isla producto del bloqueo. Los insumos serán enviados directamente a Cuba, asegurando que la ayuda llegue a quienes más lo necesitan.
        </p>

        <h3 className="text-2xl font-display font-extrabold text-marti-black mb-4 mt-10">
          El valor del trabajo voluntario
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Fieles a nuestra tradición de autogestión y disciplina, los brigadistas y militantes dedicaron horas a organizar cada unidad médica, garantizando que el envío cumpla con todos los estándares necesarios para su distribución.
        </p>

        <blockquote className="border-l-4 border-marti-orange pl-6 my-8">
          <p className="text-xl text-gray-800 italic leading-relaxed font-medium">
            "No se pueden hacer grandes cosas sin grandes amigos". Esta frase de Martí cobra vida hoy en cada caja sellada y en cada voluntario que aporta su tiempo para romper el cerco económico contra la Mayor de las Antillas.
          </p>
        </blockquote>

        <h3 className="text-2xl font-display font-extrabold text-marti-black mb-4 mt-10">
          Un solo puño por la salud
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Desde su fundación en julio de 1990, nuestra organización ha mantenido una labor ininterrumpida de apoyo político y material. Esta nueva acción de solidaridad directa reafirma nuestra identidad como un colectivo que no solo denuncia, sino que actúa.
        </p>

        <h4 className="text-xl font-display font-extrabold text-marti-black mb-6">
          Puntos clave de la jornada:
        </h4>
        <ul className="space-y-5 mb-10">
          <li className="flex items-start gap-4">
            <CheckCircle className="text-marti-orange mt-1 flex-shrink-0" size={22} />
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Clasificación rigurosa:</strong> Selección de medicamentos por tipo y fecha de vencimiento para optimizar su uso en la isla.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-marti-orange mt-1 flex-shrink-0" size={22} />
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Unidad en la acción:</strong> Participación de militantes históricos y jóvenes estudiantes que dan continuidad a nuestra fuerza creativa.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-marti-orange mt-1 flex-shrink-0" size={22} />
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Destino directo:</strong> Coordinación logística para que el aporte llegue sin intermediarios a manos del pueblo cubano.
            </p>
          </li>
        </ul>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Esta labor es una muestra más de que, en Concepción, la solidaridad con Cuba es una tarea permanente. Como siempre decimos: <strong className="text-marti-orange">¡Unidad, unidad y más unidad para organizar y vencer!</strong>
          </p>
        </div>
      </>
    ),
  },
];

const NoticiasPage = () => {
  const [selected, setSelected] = useState<Noticia | null>(null);

  return (
    <>
      <SEO
        title="Noticias y Declaraciones"
        description="Comunicados, declaraciones políticas y noticias de la Corporación José Martí de Concepción. Solidaridad con Cuba y denuncia del bloqueo genocida."
        url="/noticias"
        image="/images/galeria/nobloqueo.jpg"
        type="article"
      />
      {/* Header */}
      <section className="relative min-h-[50vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/galeria/noticias.jpg"
            alt="Noticias"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-marti-black/80 via-marti-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-marti-orange/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-lg">
              <Heart size={14} fill="currentColor" /> Comunicados
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-8 leading-[1.1] text-balance">
              Noticias y <span className="text-marti-orange">Declaraciones</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Vista detalle */}
      <AnimatePresence>
        {selected && (
          <motion.section
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-24 bg-white"
          >
            <div className="max-w-4xl mx-auto px-4">
              {/* Botón volver */}
              <button
                onClick={() => setSelected(null)}
                className="inline-flex items-center gap-2 text-marti-blue font-bold text-sm uppercase tracking-widest mb-8 hover:text-marti-orange transition-colors group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Volver a noticias
              </button>

              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Imagen principal */}
                <div className="rounded-[2rem] overflow-hidden mb-10 shadow-2xl">
                  <img
                    src={selected.image}
                    alt={selected.imageAlt}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Contenido */}
                <div className="bg-marti-warm rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-gray-100">
                  <div className="inline-flex items-center gap-2 bg-marti-blue text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                    {selected.tag}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-display font-extrabold text-marti-black mb-8 leading-tight">
                    {selected.title}
                  </h2>

                  {selected.content}
                </div>
              </motion.article>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Grid de tarjetas */}
      {!selected && (
        <section className="py-24 bg-marti-warm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {noticias.map((noticia, index) => (
                <motion.div
                  key={noticia.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  onClick={() => {
                    setSelected(noticia);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 cursor-pointer group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Miniatura */}
                  <div className="h-56 overflow-hidden">
                    <img
                      src={noticia.image}
                      alt={noticia.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6 md:p-8">
                    <div className="inline-flex items-center gap-2 bg-marti-blue text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                      {noticia.tag}
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-extrabold text-marti-black mb-3 leading-tight group-hover:text-marti-blue transition-colors">
                      {noticia.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {noticia.excerpt}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-marti-orange font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all">
                      Leer más <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer link */}
      <section className="py-12 bg-marti-blue">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-white font-black text-lg hover:text-marti-orange transition-all group">
            VOLVER AL INICIO <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default NoticiasPage;
