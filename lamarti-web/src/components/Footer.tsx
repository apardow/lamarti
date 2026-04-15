import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-marti-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-marti-orange rounded-lg flex items-center justify-center text-white font-black">
                M
              </div>
              <span className="font-display font-black text-2xl">LA MARTÍ</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              Corporación José Martí de Concepción. Trabajando por la unidad y
              solidaridad de los pueblos de Nuestra América desde 1990.
            </p>
            <div className="flex gap-4">
              {[Globe, Link2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-marti-orange transition-all hover:-translate-y-1"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-black text-lg mb-8 uppercase tracking-widest text-marti-orange">
              Explorar
            </h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/historia" className="hover:text-white transition-colors">
                  Nuestra Historia
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="hover:text-white transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/convocatorias" className="hover:text-white transition-colors">
                  Convocatorias
                </Link>
              </li>
              <li>
                <Link href="/cronologia" className="hover:text-white transition-colors">
                  Cronología
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black text-lg mb-8 uppercase tracking-widest text-marti-orange">
              Contacto
            </h4>
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
            <h4 className="font-display font-black text-lg mb-8 uppercase tracking-widest text-marti-orange">
              Boletín
            </h4>
            <p className="text-gray-400 mb-6 text-sm">
              Recibe noticias sobre nuestras brigadas y actividades.
            </p>
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
          <p>
            © {new Date().getFullYear()} Corporación José Martí. Todos los
            derechos reservados.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">
              Privacidad
            </a>
            <a href="#" className="hover:text-white">
              Términos
            </a>
            <a href="#" className="hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
