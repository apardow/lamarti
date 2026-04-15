"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Historia", href: "/historia" },
  { name: "Noticias", href: "/noticias" },
  { name: "Convocatorias", href: "/convocatorias" },
  { name: "Cronología", href: "/cronologia" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/logo/lamarti-logoCh.png"
              alt="Corporación José Martí"
              width={160}
              height={56}
              className="h-10 md:h-14 w-auto object-contain"
              preload
            />
          </Link>
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-all hover:text-marti-orange ${
                  scrolled ? "text-marti-black" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/convocatorias"
              className="bg-marti-orange text-white px-8 py-3 rounded-full text-sm font-extrabold shadow-xl hover:bg-marti-red transition-all transform hover:scale-105 active:scale-95"
            >
              ÚNETE AHORA
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors ${
                scrolled
                  ? "bg-gray-100 text-marti-black"
                  : "bg-white/10 text-white"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col p-8"
          >
            <div className="flex justify-end mb-12">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-bold text-marti-black hover:text-marti-orange"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8">
                <Link
                  href="/convocatorias"
                  className="block w-full bg-marti-orange text-white py-5 rounded-2xl text-lg font-extrabold shadow-xl text-center"
                  onClick={() => setIsOpen(false)}
                >
                  ÚNETE AHORA
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
