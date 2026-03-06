import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Heart, Users, Globe, 
  ArrowRight, CheckCircle2, Star, Quote, 
  Facebook, Instagram, Twitter, Mail, MapPin, Phone
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nuestra Causa', href: '#causa' },
    { name: 'Impacto', href: '#impacto' },
    { name: 'Cómo Ayudar', href: '#ayudar' },
    { name: 'Historias', href: '#historias' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-marti-orange rounded-xl flex items-center justify-center text-white shadow-lg transform -rotate-3">
              <Heart fill="currentColor" size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-extrabold text-xl leading-none ${scrolled ? 'text-marti-blue' : 'text-white'}`}>
                LA MARTÍ
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${scrolled ? 'text-gray-500' : 'text-white/80'}`}>
                Concepción · Chile
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-all hover:text-marti-orange ${
                  scrolled ? 'text-marti-black' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-marti-orange text-white px-8 py-3 rounded-full text-sm font-extrabold shadow-xl hover:bg-marti-red transition-all transform hover:scale-105 active:scale-95">
              ÚNETE AHORA
            </button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-gray-100 text-marti-black' : 'bg-white/10 text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-extrabold text-2xl text-marti-blue">LA MARTÍ</span>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-bold text-marti-black hover:text-marti-orange"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-8">
                <button className="w-full bg-marti-orange text-white py-5 rounded-2xl text-lg font-extrabold shadow-xl">
                  ÚNETE AHORA
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000"
          alt="Solidaridad"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-marti-black/80 via-marti-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-marti-orange/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-lg">
              <Star size={14} fill="currentColor" /> Solidaridad Internacionalista
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-8 leading-[1.1] text-balance">
              Transformando vidas a través de la <span className="text-marti-orange">hermandad</span>
            </h1>
            <p className="text-xl text-gray-100 mb-10 leading-relaxed max-w-xl">
              En la Corporación José Martí, creemos que la solidaridad no es solo un acto, sino una forma de vida. 
              Únete a nuestra causa por la soberanía y la justicia social en Latinoamérica.
            </p>
            
            <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-6 max-w-xl border border-gray-100">
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nuestra meta 2024</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-black text-marti-blue">500</span>
                  <span className="text-gray-600 font-medium">Nuevos voluntarios</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-marti-orange"
                  />
                </div>
              </div>
              <button className="w-full md:w-auto bg-marti-blue text-white px-8 py-4 rounded-2xl font-bold hover:bg-marti-black transition-all flex items-center justify-center gap-2 group whitespace-nowrap">
                QUIERO AYUDAR <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Años de Historia', value: '34' },
    { label: 'Proyectos Activos', value: '12' },
    { label: 'Voluntarios', value: '150+' },
    { label: 'Vidas Impactadas', value: '5k+' },
  ];

  return (
    <section className="py-12 bg-marti-blue">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-display font-black mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-white/60 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImpactAreas = () => {
  const areas = [
    {
      title: 'Solidaridad con Cuba',
      desc: 'Apoyamos activamente al pueblo cubano en su lucha por la soberanía y contra el bloqueo.',
      icon: <Globe className="text-marti-orange" size={32} />,
      img: 'https://images.unsplash.com/photo-1585467314765-06137c2c388b?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Formación Política',
      desc: 'Talleres y conversatorios inspirados en el pensamiento de José Martí y la justicia social.',
      icon: <Users className="text-marti-orange" size={32} />,
      img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Cultura y Encuentro',
      desc: 'Peñas, festivales y espacios que celebran la identidad y el arte latinoamericano.',
      icon: <Heart className="text-marti-orange" size={32} />,
      img: 'https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <section id="causa" className="py-24 bg-marti-warm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-black text-marti-blue mb-6">Nuestras Áreas de Impacto</h2>
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
                <img src={area.img} alt={area.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-6 left-6 bg-white p-4 rounded-2xl shadow-lg">
                  {area.icon}
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-display font-black text-marti-blue mb-4">{area.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{area.desc}</p>
                <button className="text-marti-orange font-black flex items-center gap-2 hover:gap-4 transition-all">
                  SABER MÁS <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-marti-blue rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-marti-orange/10 -skew-x-12 translate-x-1/4"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <Quote size={80} className="text-marti-orange mb-8 opacity-50" />
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-8 leading-tight">
                "La solidaridad es la ternura de los pueblos."
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-marti-orange flex items-center justify-center text-white font-black text-2xl">JM</div>
                <div>
                  <p className="text-white font-bold text-xl">José Martí</p>
                  <p className="text-white/60">Inspiración de nuestra Corporación</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">¿Por qué unirse?</h3>
              <ul className="space-y-4">
                {[
                  'Defensa de la soberanía latinoamericana',
                  'Apoyo directo a proyectos solidarios',
                  'Formación en valores humanos y sociales',
                  'Participación en una red internacional'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 size={20} className="text-marti-orange" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-10 bg-white text-marti-blue py-4 rounded-2xl font-black hover:bg-marti-orange hover:text-white transition-all">
                QUIERO SER VOLUNTARIO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stories = () => {
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

const Footer = () => {
  return (
    <footer className="bg-marti-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-marti-orange rounded-lg flex items-center justify-center text-white font-black">M</div>
              <span className="font-display font-black text-2xl">LA MARTÍ</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              Corporación José Martí de Concepción. Trabajando por la unidad y solidaridad de los pueblos de Nuestra América desde 1990.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-marti-orange transition-all hover:-translate-y-1">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-black text-lg mb-8 uppercase tracking-widest text-marti-orange">Explorar</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Nuestra Historia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Proyectos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Voluntariado</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Donaciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transparencia</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black text-lg mb-8 uppercase tracking-widest text-marti-orange">Contacto</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex gap-4">
                <MapPin className="text-marti-orange shrink-0" size={20} />
                <span>Concepción, Región del Bío Bío, Chile</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-marti-orange shrink-0" size={20} />
                <span>+56 9 1234 5678</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-marti-orange shrink-0" size={20} />
                <span>contacto@lamarti.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black text-lg mb-8 uppercase tracking-widest text-marti-orange">Boletín</h4>
            <p className="text-gray-400 mb-6 text-sm">Recibe noticias sobre nuestras brigadas y actividades.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-marti-orange transition-colors"
              />
              <button className="bg-marti-orange text-white py-4 rounded-2xl font-black hover:bg-marti-red transition-all">
                SUSCRIBIRME
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm font-medium">
          <p>© {new Date().getFullYear()} Corporación José Martí. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-marti-orange selection:text-white">
      <Navbar />
      <Hero />
      <Stats />
      <ImpactAreas />
      <Testimonial />
      <Stories />
      <Footer />
    </div>
  );
}
