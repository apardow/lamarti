import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const stories = [
  {
    title: "Brigada de Solidaridad en La Habana",
    excerpt: "Nuestros voluntarios compartieron experiencias y trabajo comunitario durante dos semanas...",
    date: "Marzo 2024",
    img: "https://images.unsplash.com/photo-1504150559433-c4a5e36e2190?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Encuentro Regional de Juventudes",
    excerpt: "Más de 100 jóvenes se reunieron en Concepción para debatir sobre el futuro de la región...",
    date: "Enero 2024",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
  }
];

const Stories = () => {
  return (
    <section id="historias" className="py-24 bg-marti-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-black text-marti-blue mb-6">Historias de Impacto</h2>
            <p className="text-lg text-gray-600">Conoce las vivencias reales de quienes forman parte de esta gran red de solidaridad.</p>
          </div>
          <button className="bg-white border-2 border-marti-blue text-marti-blue px-8 py-4 rounded-2xl font-black hover:bg-marti-blue hover:text-white transition-all">
            VER TODAS LAS HISTORIAS
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col lg:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-xl"
            >
              <div className="lg:w-1/2 h-72 lg:h-auto">
                <img src={story.img} alt={story.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="lg:w-1/2 p-10 flex flex-col justify-center">
                <span className="text-marti-orange font-black text-xs uppercase tracking-widest mb-4">{story.date}</span>
                <h3 className="text-2xl font-display font-black text-marti-blue mb-4 leading-tight">{story.title}</h3>
                <p className="text-gray-600 mb-8">{story.excerpt}</p>
                <button className="text-marti-blue font-black flex items-center gap-2 group">
                  LEER MÁS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;
