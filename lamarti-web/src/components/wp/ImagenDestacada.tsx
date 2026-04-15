import Image from "next/image";
import type { ImagenConSizes } from "@/lib/wp/domain";

interface ImagenDestacadaProps {
  imagen: ImagenConSizes | null;
  alt?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
}

export default function ImagenDestacada({
  imagen,
  alt,
  fill = false,
  width,
  height,
  className = "",
  sizes,
}: ImagenDestacadaProps) {
  if (!imagen) {
    return (
      <div
        className={`bg-marti-gray flex items-center justify-center ${className}`}
      >
        <span className="text-gray-400 text-sm">Sin imagen</span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={imagen.url}
        alt={alt ?? imagen.alt}
        fill
        className={className}
        sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      />
    );
  }

  return (
    <Image
      src={imagen.url}
      alt={alt ?? imagen.alt}
      width={width ?? imagen.width}
      height={height ?? imagen.height}
      className={className}
      sizes={sizes}
    />
  );
}
