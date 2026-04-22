"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { HitosPorAnio } from "@/lib/wp/hitos";
import ImagenDestacada from "./ImagenDestacada";
import WPContent from "./WPContent";

interface CronologiaAccordionProps {
  data: HitosPorAnio[];
}

export default function CronologiaAccordion({ data }: CronologiaAccordionProps) {
  const [openYear, setOpenYear] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg py-20">
        No hay hitos registrados aún.
      </p>
    );
  }

  return (
    <div className="relative">
      <div
        className="absolute left-[60px] top-0 bottom-0 w-0.5 bg-marti-blue/15 -z-0"
        aria-hidden="true"
      />

      <ul className="relative space-y-4">
        {data.map((grupo, index) => {
          const isOpen = openYear === grupo.anio;
          const eager = index < 4;

          return (
            <li
              key={grupo.anio}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenYear(isOpen ? null : grupo.anio)}
                aria-expanded={isOpen}
                aria-controls={`hitos-${grupo.anio}`}
                className="w-full flex items-center gap-6 p-4 md:p-5 text-left hover:bg-marti-gray/40 transition-colors"
              >
                <div className="relative w-[120px] h-[80px] shrink-0 rounded-xl overflow-hidden bg-marti-blue flex items-center justify-center">
                  {grupo.imagenRepresentativa ? (
                    <Image
                      src={grupo.imagenRepresentativa}
                      alt={`Hitos del año ${grupo.anio}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                      loading={eager ? "eager" : "lazy"}
                    />
                  ) : (
                    <span className="text-white font-display font-black text-xl">
                      {grupo.anio}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="block font-display font-black text-3xl md:text-4xl text-marti-blue leading-none">
                    {grupo.anio}
                  </span>
                  <span className="text-sm text-gray-500 mt-1 inline-block">
                    {grupo.hitos.length} {grupo.hitos.length === 1 ? "hito" : "hitos"}
                  </span>
                </div>

                <ChevronDown
                  size={28}
                  className={`shrink-0 text-marti-blue transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`hitos-${grupo.anio}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-100 px-4 md:px-6 py-6 space-y-6">
                      {grupo.hitos.map((hito) => (
                        <article
                          key={hito.id}
                          className="flex flex-col md:flex-row gap-4 md:gap-6 pb-6 last:pb-0 border-b last:border-b-0 border-gray-100"
                        >
                          {hito.imagen && (
                            <div className="relative w-full md:w-48 h-40 md:h-32 shrink-0 rounded-xl overflow-hidden">
                              <ImagenDestacada
                                imagen={hito.imagen}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 192px"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg md:text-xl font-display font-black text-marti-black leading-tight mb-2">
                              {hito.titulo}
                            </h3>
                            <WPContent html={hito.descripcion} className="prose-sm" />
                          </div>
                        </article>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
