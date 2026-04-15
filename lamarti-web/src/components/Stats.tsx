const stats = [
  { label: "Años de Historia", value: "34" },
  { label: "Proyectos Activos", value: "12" },
  { label: "Voluntarios", value: "150+" },
  { label: "Vidas Impactadas", value: "5k+" },
];

export default function Stats() {
  return (
    <section className="py-12 bg-marti-blue">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-display font-black mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white/60 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
