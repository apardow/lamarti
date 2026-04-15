import type { Hito } from "@/lib/wp/domain";
import ImagenDestacada from "./ImagenDestacada";
import WPContent from "./WPContent";

interface HitoTimelineItemProps {
  hito: Hito;
  index: number;
}

export default function HitoTimelineItem({
  hito,
  index,
}: HitoTimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-center w-full group">
      {/* Desktop: alternating layout */}
      <div
        className={`hidden md:flex w-full items-center ${
          isLeft ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="w-5/12">
          <div
            className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${
              isLeft ? "mr-8" : "ml-8"
            }`}
          >
            {hito.imagen && (
              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <ImagenDestacada
                  imagen={hito.imagen}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-lg font-display font-black text-marti-black leading-tight mb-2">
              {hito.titulo}
            </h3>
            <WPContent html={hito.descripcion} className="prose-sm" />
          </div>
        </div>

        {/* Center marker */}
        <div className="w-2/12 flex justify-center relative">
          <div className="w-14 h-14 rounded-full bg-marti-blue flex items-center justify-center text-white font-display font-black text-sm shadow-lg z-10 group-hover:bg-marti-orange transition-colors">
            {hito.anio}
          </div>
        </div>

        <div className="w-5/12" />
      </div>

      {/* Mobile: all on right */}
      <div className="flex md:hidden w-full items-start">
        <div className="flex flex-col items-center mr-4 shrink-0">
          <div className="w-12 h-12 rounded-full bg-marti-blue flex items-center justify-center text-white font-display font-black text-xs shadow-lg z-10">
            {hito.anio}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 flex-1">
          {hito.imagen && (
            <div className="relative h-40 rounded-xl overflow-hidden mb-3">
              <ImagenDestacada
                imagen={hito.imagen}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h3 className="text-base font-display font-black text-marti-black leading-tight mb-2">
            {hito.titulo}
          </h3>
          <WPContent html={hito.descripcion} className="prose-sm" />
        </div>
      </div>
    </div>
  );
}
