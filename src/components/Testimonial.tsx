import { Quote, CheckCircle2 } from 'lucide-react';

const values = [
  'Amistad entre los pueblos',
  'Defensa de la soberanía',
  'Justicia social en América Latina',
  'Solidaridad internacionalista'
];

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
                "Solidaridad es el nombre político que tiene el amor."
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-marti-orange flex items-center justify-center text-white font-black text-2xl">JS</div>
                <div>
                  <p className="text-white font-bold text-xl">Joel Suárez</p>
                  <p className="text-white/60">Centro Martín Luther King (Cuba)</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Quiénes somos</h3>
              <p className="text-white/90 leading-relaxed mb-8">
                La Corporación José Martí de Concepción es una organización solidaria integrada por personas que comparten el compromiso con la amistad entre los pueblos y la defensa de la soberanía y la justicia social en América Latina.
              </p>
              <ul className="space-y-4">
                {values.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 size={20} className="text-marti-orange" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
