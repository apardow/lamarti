import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Asociaci%C3%B3n-Jos%C3%A9-Mart%C3%AD/100066411169767/",
    path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/asociacion.josemarti/",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.32.79.74 1.45 1.38 2.13a5.86 5.86 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.41-10.41a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@asociacionjosemarti2412",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
  },
];

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
              {SOCIALS.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-marti-orange transition-all hover:-translate-y-1"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
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
                <a href="tel:+56987540885" className="hover:text-white transition-colors">
                  +56 9 8754 0885
                </a>
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
