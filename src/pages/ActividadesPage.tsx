import { motion } from 'motion/react';
import { Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const ActividadesPage = () => {
  return (
    <>
      <SEO
        title="Actividades"
        description="Asamblea de Solidaridad con Cuba contra el Bloqueo. La Martí Concepción reporta gran asistencia en jornada histórica en el Sindicato PETROX."
        url="/actividades"
        image="/images/galeria/asamblea1.jpeg"
        type="article"
      />
      {/* Header */}
      <section className="relative min-h-[50vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/galeria/actividades.jpg"
            alt="Actividades"
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
              <Users size={14} /> Nuestro trabajo
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-8 leading-[1.1] text-balance">
              <span className="text-marti-orange">Actividades</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Nota: Asamblea de Solidaridad con Cuba */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Imagen principal */}
            <div className="rounded-[2rem] overflow-hidden mb-10 shadow-2xl">
              <img
                src="/images/galeria/asamblea1.jpeg"
                alt="Asamblea Urgente de Solidaridad con Cuba contra el Bloqueo"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Contenido */}
            <div className="bg-marti-warm rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-gray-100">
              {/* Etiqueta */}
              <div className="inline-flex items-center gap-2 bg-marti-blue text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Actividad Destacada
              </div>

              {/* Título */}
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-marti-black mb-8 leading-tight">
                La Martí Concepción Reporta Gran Asistencia en Asamblea de Solidaridad con Cuba contra el Bloqueo
              </h2>

              {/* Párrafo 1 */}
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>(Concepción, Chile)</strong> — La Martí de Concepción celebra el éxito rotundo de la Asamblea Urgente de Solidaridad con Cuba realizada el pasado jueves 26 de febrero. Con una asistencia que desbordó la sala del Sindicato PETROX, la jornada marcó un hito en la movilización solidaria de la región.
              </p>

              {/* Párrafo 2 */}
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                El evento, que inició puntualmente a las 19:00 horas en el corazón de Concepción (Barros Arana con Janequeo), reunió a una amplia diversidad de actores sociales bajo el lema: <strong className="text-marti-blue">"Cuba nos une, nos convoca y nos recuerda que se puede resistir y vencer"</strong>.
              </p>

              {/* Imagen interior */}
              <div className="my-10 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/images/galeria/asamblea.jpg"
                  alt="Asistentes a la Asamblea de Solidaridad con Cuba en el Sindicato PETROX"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Párrafo 3 */}
              <p className="text-lg text-gray-700 leading-relaxed mb-10">
                Durante la asamblea, se debatió intensamente sobre la situación actual en Cuba y se condenó unánimemente la intensificación del bloqueo. Las y los oradores enfatizaron el mensaje central de la convocatoria: <strong className="text-marti-blue">"No es solo un bloqueo económico, es un genocidio planificado"</strong>, haciendo referencia directa a los ataques políticos representados por figuras anti-cubanas en Estados Unidos.
              </p>

              {/* Subtítulo */}
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-marti-black mb-6">
                Principales Conclusiones
              </h3>

              {/* Lista de conclusiones */}
              <ul className="space-y-5 mb-10">
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-marti-orange mt-1 flex-shrink-0" size={22} />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    La masiva concurrencia reafirma la vigencia del llamado de José Martí: <strong className="text-marti-blue">"Quién se levanta con Cuba se levanta para todos los tiempos"</strong>.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-marti-orange mt-1 flex-shrink-0" size={22} />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Se acordaron nuevas acciones de movilización y difusión para denunciar el genocidio planificado que representa el bloqueo.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-marti-orange mt-1 flex-shrink-0" size={22} />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    La asamblea sirvió para fortalecer los lazos entre las diversas organizaciones que componen el movimiento de solidaridad en el Bío Bío.
                  </p>
                </li>
              </ul>

              {/* Cierre */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  La Martí Concepción agradece a todos los asistentes y a los trabajadores de PETROX por facilitar el espacio para esta necesaria y exitosa jornada de <strong className="text-marti-orange">unidad</strong>.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Footer link */}
      <section className="py-12 bg-marti-blue">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link to="/noticias" className="inline-flex items-center gap-2 text-white font-black text-lg hover:text-marti-orange transition-all group">
            VER NOTICIAS Y DECLARACIONES <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ActividadesPage;
