import { motion } from 'motion/react';
import { Globe, Users, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const areas = [
  {
    title: 'Nuestra Historia',
    desc: 'La experiencia del colectivo se inicia en 1990 con la creación del Comité de Solidaridad con Cuba. Con el paso de los años se consolidó como parte del Movimiento Chileno de Solidaridad con Cuba, desarrollando actividades culturales, políticas y solidarias.',
    icon: <Globe className="text-marti-orange" size={32} />,
    img: '/images/galeria/actividades.jpg',
    link: '/historia',
    cta: 'VER HISTORIA COMPLETA'
  },
  {
    title: 'Asamblea de Solidaridad con Cuba',
    desc: 'La Martí de Concepción celebra el éxito rotundo de la Asamblea Urgente de Solidaridad con Cuba. Con una asistencia que desbordó la sala del Sindicato PETROX, la jornada marcó un hito en la movilización solidaria de la región.',
    icon: <Users className="text-marti-orange" size={32} />,
    img: '/images/galeria/asamblea1.jpeg',
    link: '/actividades',
    cta: 'VER ACTIVIDADES'
  },
  {
    title: 'Manos Solidarias: Envío de Medicamentos',
    desc: 'Voluntarios y voluntarias de la Asociación Cultural José Martí se reunieron para clasificar, inventariar y embalar donaciones de medicamentos en apoyo al pueblo cubano, resultado directo de la solidaridad de la comunidad penquista.',
    icon: <Heart className="text-marti-orange" size={32} />,
    img: '/images/galeria/noticiaMedicinaSolidaria.jpg',
    link: '/noticias',
    cta: 'VER NOTICIAS'
  }
];

const ImpactAreas = () => {
  return (
    <section className="py-24 bg-marti-warm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-black text-marti-blue mb-6">Conoce Nuestro Trabajo</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Trabajamos incansablemente en diversos frentes para construir un continente más unido,
            justo y solidario, siguiendo el legado de los grandes pensadores de Nuestra América.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 group"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={area.img} alt={area.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6 bg-white p-4 rounded-2xl shadow-lg">
                  {area.icon}
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-display font-black text-marti-blue mb-4">{area.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{area.desc}</p>
                <Link to={area.link} className="text-marti-orange font-black flex items-center gap-2 hover:gap-4 transition-all">
                  {area.cta} <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactAreas;
