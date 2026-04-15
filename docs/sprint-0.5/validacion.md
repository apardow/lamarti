# Informe de Validación Técnica — Sprint 0.5
## Proyecto `lamarti-web` (Next.js)

**Fecha:** 15 de abril de 2026
**Validado por:** Claude (asistente técnico)
**Directorio:** `lamarti-web/`
**Objetivo:** Inspección completa sin modificar código, previo al Sprint 1B

---

## 1. Estado del Build

### 1.1 `npm run build`

- **Resultado:** Build exitoso
- **Warnings TS:** 0
- **Errors ESLint:** 0
- **Tiempo de compilación:** ~4.5s (Turbopack)
- **Tamaño del build:** 14 MB total (`.next/`), 1.7 MB estáticos (`.next/static/`)

**Rutas generadas:**

| Ruta | Tipo | Revalidate | Expire |
|---|---|---|---|
| `/` | ○ Static | — | — |
| `/_not-found` | ○ Static | — | — |
| `/actividades` | ○ Static | — | — |
| `/api/revalidate` | ƒ Dynamic | — | — |
| `/convocatorias` | ○ Static | 1m | 1y |
| `/convocatorias/[slug]` | ● SSG | 1m | 1y |
| `/cronologia` | ○ Static | 1h | 1y |
| `/historia` | ○ Static | — | — |
| `/noticias` | ○ Static | 1m | 1y |
| `/noticias/[slug]` | ● SSG | 1m | 1y |

**Slugs pre-renderizados en build:**
- `/convocatorias/convocatoria-concepcion-se-moviliza-por-cuba`
- `/noticias/proyeccion-en-concepcion-del-documental-che-guevara-en-el-siglo-xxi-busca-recaudar-fondos-para-prensa-latina`

> Nota: estos slugs provienen de la API de WP real (`api.lamarti.org`), lo que
> confirma que la integración WP ya está activa en build time.

### 1.2 `npm run lint`

- **Errors:** 0
- **Warnings:** 0
- ESLint limpio.

### 1.3 `npx tsc --noEmit`

- **Errors de tipos:** 0
- TypeScript strict check pasa sin errores.

### 1.4 `npm run dev`

- **Arranca sin errores:** Sí
- **Warnings al arrancar:** Ninguno
- **Puerto:** 3000 (localhost + red local 192.168.1.86)
- **Tiempo de arranque:** ~1.3s
- **Variables de entorno cargadas:** `.env.local`

---

## 2. Inspección de Archivos Clave

### 2.1 `package.json`

```json
{
  "name": "lamarti-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@tailwindcss/typography": "^0.5.19",
    "lucide-react": "^1.8.0",
    "motion": "^12.38.0",
    "next": "16.2.3",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

**Comparación con el proyecto Vite:**

| Dependencia | Vite | Next.js | Cambio |
|---|---|---|---|
| react | ^19.0.0 | 19.2.4 | Upgrade patch |
| react-dom | ^19.0.0 | 19.2.4 | Upgrade patch |
| motion | ^12.23.24 | ^12.38.0 | Upgrade minor |
| lucide-react | ^0.546.0 | ^1.8.0 | **Upgrade major** (0.x → 1.x) |
| tailwindcss | ^4.1.14 | ^4 | Compatible |
| typescript | ~5.8.2 | ^5 | Compatible (rango más amplio) |
| next | — | 16.2.3 | **Nuevo** (ver Fase 8) |
| @tailwindcss/typography | — | ^0.5.19 | **Nuevo** (para contenido WP) |
| @tailwindcss/postcss | — | ^4 | **Nuevo** (reemplaza @tailwindcss/vite) |
| eslint-config-next | — | 16.2.3 | **Nuevo** |
| react-router-dom | ^7.13.1 | — | Eliminado (App Router) |
| react-helmet-async | ^3.0.0 | — | Eliminado (Metadata API) |
| @google/genai | ^1.29.0 | — | Eliminado |
| express | ^4.21.2 | — | Eliminado |
| better-sqlite3 | ^12.4.1 | — | Eliminado |
| dotenv | ^17.2.3 | — | Eliminado |
| @vitejs/plugin-react | ^5.0.4 | — | Eliminado |
| vite | ^6.2.0 | — | Eliminado |

**Observaciones:**
- ⚠️ `lucide-react` saltó de 0.x a 1.x — breaking change potencial en imports (verificar si los iconos usados siguen existiendo)
- ⚠️ `next` 16.2.3 en lugar de 15.x solicitado (ver Fase 8)
- No hay dependencias innecesarias ni duplicadas
- Las dependencias eliminadas son correctas y esperadas

### 2.2 `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter, Montserrat, Lora } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const lora = Lora({
  variable: "--font-editorial",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Corporación José Martí · Concepción, Chile",
    template: "%s | Corporación José Martí",
  },
  description:
    "Corporación José Martí de Concepción, Chile. Solidaridad internacionalista, formación política y cultura latinoamericana desde 1990.",
  metadataBase: new URL("https://new.lamarti.org"),
  openGraph: {
    type: "website",
    siteName: "Corporación José Martí",
    locale: "es_CL",
    title: "Corporación José Martí · Concepción, Chile",
    description:
      "Solidaridad internacionalista, formación política y cultura latinoamericana desde 1990.",
    images: ["/images/logo/lamarti.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporación José Martí · Concepción, Chile",
    description:
      "Solidaridad internacionalista, formación política y cultura latinoamericana desde 1990.",
    images: ["/images/logo/lamarti.png"],
  },
  icons: {
    icon: "/images/logo/lamarti.png",
    apple: "/images/logo/lamarti.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable} ${lora.variable}`}
    >
      <body className="min-h-screen selection:bg-marti-orange selection:text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

**Verificaciones:**

| Check | Estado | Detalle |
|---|---|---|
| `metadata` con `title.template` | ✅ | `"%s \| Corporación José Martí"` |
| JSON-LD tipo `NGO` | ❌ **PENDIENTE** | El Vite original tiene JSON-LD `Organization` en `index.html`. No fue migrado al layout de Next.js |
| `next/font/google` correcto | ✅ | Inter, Montserrat, Lora con variables CSS correctas |
| Importa Navbar y Footer | ✅ | Desde `@/components/` |
| `metadataBase` configurado | ✅ | `https://new.lamarti.org` |
| `lang="es"` en html | ✅ | Correcto |

**Issue encontrado:** El JSON-LD de tipo `Organization` del proyecto Vite no fue migrado.

JSON-LD original en `index.html` del proyecto Vite:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Corporación José Martí",
  "alternateName": "La Martí Concepción",
  "url": "https://lamarti.cl",
  "logo": "https://lamarti.cl/images/logo/lamarti.png",
  "foundingDate": "1990-07",
  "description": "Organización de solidaridad internacionalista, formación política y cultura latinoamericana en Concepción, Chile.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Concepción",
    "addressCountry": "CL"
  },
  "sameAs": []
}
```

> Nota: las páginas de detalle de noticias (`/noticias/[slug]`) SÍ tienen JSON-LD
> (`NewsArticle`), pero el JSON-LD global de la organización no está en el layout.

### 2.3 `next.config.ts`

```typescript
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.lamarti.org",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
```

**Verificaciones:**
- ✅ `remotePatterns` para `api.lamarti.org` configurado
- ✅ Pathname limitado a `/wp-content/uploads/**` (seguro)
- ✅ Protocol `https` explícito
- ✅ Turbopack habilitado

### 2.4 `src/app/globals.css`

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Montserrat", sans-serif;
  --font-editorial: "Lora", "Georgia", serif;

  --color-marti-blue: #004087;
  --color-marti-red: #C62828;
  --color-marti-orange: #C62828;
  --color-marti-black: #010006;
  --color-marti-gray: #F8F9FA;
  --color-marti-warm: #FFF5F5;
}

@layer base {
  body {
    @apply text-marti-black bg-white font-sans antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-display font-bold tracking-tight;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

**Verificación de tokens:**

| Token | Esperado | Encontrado | Estado |
|---|---|---|---|
| `marti-blue` | #004087 | #004087 | ✅ |
| `marti-red` | #C62828 | #C62828 | ✅ |
| `marti-orange` | #C62828 | #C62828 | ✅ |
| `marti-black` | #010006 | #010006 | ✅ |
| `marti-gray` | #F8F9FA | #F8F9FA | ✅ |
| `marti-warm` | #FFF5F5 | #FFF5F5 | ✅ |

> Nota: `marti-red` y `marti-orange` comparten el mismo hex (#C62828). Esto es
> intencional y viene del proyecto Vite original.

### 2.5 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

**Verificaciones:**
- ✅ `strict: true`
- ✅ Path alias `@/*` → `./src/*`
- ✅ Plugin `next` configurado
- ✅ `incremental: true` para builds más rápidos

---

## 3. Inspección de Componentes WP (CRÍTICO)

### Clasificación:
- **A)** Scaffold vacío con TODO/comentarios → ideal
- **B)** Implementación con tipos/estructura asumida → revisar
- **C)** Implementación que llama a la API real → se adelantó al 1B

---

### 3.1 `src/components/wp/NoticiaCard.tsx`

**Clasificación: B) ⚠️ Implementación con estructura asumida**

```tsx
import Link from "next/link";
import type { Noticia } from "@/lib/wp/domain";
import { formatDateEs } from "@/lib/wp/mappers";
import ImagenDestacada from "./ImagenDestacada";

interface NoticiaCardProps {
  noticia: Noticia;
}

export default function NoticiaCard({ noticia }: NoticiaCardProps) {
  return (
    <article className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
      <div className="h-56 overflow-hidden relative">
        <ImagenDestacada
          imagen={noticia.imagen}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {noticia.categoria && (
          <div className="absolute top-4 left-4">
            <span className="bg-marti-blue/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {noticia.categoria.nombre}
            </span>
          </div>
        )}
      </div>
      <div className="p-8">
        <time className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {formatDateEs(noticia.fechaPublicacion)}
        </time>
        <h3 className="text-xl font-display font-black text-marti-black mt-2 mb-3 leading-tight line-clamp-2">
          <Link href={`/noticias/${noticia.slug}`} className="hover:text-marti-blue transition-colors">
            {noticia.titulo}
          </Link>
        </h3>
        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {noticia.excerpt}
        </p>
        <Link
          href={`/noticias/${noticia.slug}`}
          className="text-marti-orange font-bold text-sm hover:text-marti-red transition-colors"
        >
          Leer más →
        </Link>
      </div>
    </article>
  );
}
```

**Análisis:** Componente completo con UI, importa tipos de `@/lib/wp/domain` y
funciones de `@/lib/wp/mappers`. Asume estructura de datos `Noticia` con campos
`imagen`, `categoria`, `fechaPublicacion`, `titulo`, `excerpt`, `slug`.

---

### 3.2 `src/components/wp/ConvocatoriaCard.tsx`

**Clasificación: B) ⚠️ Implementación con estructura asumida**

Componente completo (90 líneas). Asume estructura `Convocatoria` con campos:
`imagen`, `tipo`, `finalizada`, `titulo`, `slug`, `fechaEvento`, `lugar`,
`cupos`, `excerpt`, `linkInscripcion`. Incluye lógica de negocio (opacidad si
finalizada, botón de inscripción condicional).

---

### 3.3 `src/components/wp/HitoTimelineItem.tsx`

**Clasificación: B) ⚠️ Implementación con estructura asumida**

Componente completo (81 líneas). Layout alternado desktop/mobile para timeline.
Asume estructura `Hito` con campos: `imagen`, `titulo`, `descripcion`, `anio`.

---

### 3.4 `src/components/wp/ImagenDestacada.tsx`

**Clasificación: B) ⚠️ Implementación con estructura asumida**

Componente completo (55 líneas). Wrapper de `next/image` con fallback para
imágenes nulas. Asume tipo `ImagenConSizes` con campos: `url`, `alt`, `width`,
`height`, `sizes`.

---

### 3.5 `src/components/wp/BadgeFinalizada.tsx`

**Clasificación: A) ✅ Componente simple sin asunciones**

```tsx
export default function BadgeFinalizada() {
  return (
    <span className="inline-flex items-center bg-gray-500/90 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
      Finalizada
    </span>
  );
}
```

Componente puro de UI sin dependencias de datos.

---

### 3.6 `src/components/wp/WPContent.tsx`

**Clasificación: B) ⚠️ Implementación con estructura asumida**

```tsx
interface WPContentProps {
  html: string;
  className?: string;
}

export default function WPContent({ html, className = "" }: WPContentProps) {
  return (
    <div
      className={`prose prose-lg max-w-none prose-headings:font-display prose-headings:text-marti-black prose-a:text-marti-blue prose-a:underline hover:prose-a:text-marti-orange prose-img:rounded-2xl prose-strong:text-marti-black ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

Usa `dangerouslySetInnerHTML` para contenido WP. Riesgo aceptable si el contenido
viene exclusivamente de WP (fuente confiable).

---

### Resumen de componentes WP

| Componente | Clasificación | Riesgo |
|---|---|---|
| `NoticiaCard.tsx` | B) Implementación asumida | ⚠️ Medio |
| `ConvocatoriaCard.tsx` | B) Implementación asumida | ⚠️ Medio |
| `HitoTimelineItem.tsx` | B) Implementación asumida | ⚠️ Medio |
| `ImagenDestacada.tsx` | B) Implementación asumida | ⚠️ Medio |
| `BadgeFinalizada.tsx` | A) Componente simple | ✅ Bajo |
| `WPContent.tsx` | B) Implementación asumida | ⚠️ Medio |

**Hallazgo importante:** Ningún componente WP es un scaffold vacío. Todos (excepto
`BadgeFinalizada`) tienen implementaciones completas que dependen de tipos definidos
en `src/lib/wp/domain.ts`. Los tipos asumen una estructura de datos de WordPress
con Custom Post Types (`noticias`, `convocatorias`, `hitos`) y campos ACF
específicos.

---

## 4. Inspección de Rutas WP-ready

### 4.1 `src/app/noticias/page.tsx`

| Propiedad | Valor |
|---|---|
| Server Component | ✅ Sí (async function, sin "use client") |
| `metadata` exportado | ✅ title: "Noticias" |
| `generateStaticParams` | No aplica (no es ruta dinámica) |
| `generateMetadata` | No (usa metadata estático) |
| Llama a WP | ✅ `getNoticias({ perPage: 12 })` desde `@/lib/wp/noticias` |
| `revalidate` | 60 segundos |

### 4.2 `src/app/noticias/loading.tsx`

Loading skeleton con pulse animations. 6 tarjetas placeholder. No tiene metadata
ni llamadas a WP. Correcto.

### 4.3 `src/app/noticias/[slug]/page.tsx`

| Propiedad | Valor |
|---|---|
| Server Component | ✅ Sí |
| `metadata` exportado | No (usa `generateMetadata`) |
| `generateStaticParams` | ✅ `getAllNoticiaSlugs()` |
| `generateMetadata` | ✅ Genera título, descripción y OG desde la noticia |
| Llama a WP | ✅ `getNoticiaBySlug(slug)` desde `@/lib/wp/noticias` |
| `revalidate` | 60 segundos |
| JSON-LD | ✅ `NewsArticle` schema |
| `notFound()` | ✅ Si no existe el slug |

### 4.4 `src/app/convocatorias/page.tsx`

| Propiedad | Valor |
|---|---|
| Server Component | ✅ Sí |
| `metadata` exportado | ✅ title: "Convocatorias" |
| `generateStaticParams` | No aplica |
| `generateMetadata` | No (usa metadata estático) |
| Llama a WP | ✅ `getConvocatorias()` desde `@/lib/wp/convocatorias` |
| `revalidate` | 60 segundos |

### 4.5 `src/app/convocatorias/loading.tsx`

Loading skeleton. 3 tarjetas placeholder. Correcto.

### 4.6 `src/app/convocatorias/[slug]/page.tsx`

| Propiedad | Valor |
|---|---|
| Server Component | ✅ Sí |
| `metadata` exportado | No (usa `generateMetadata`) |
| `generateStaticParams` | ✅ `getAllConvocatoriaSlugs()` |
| `generateMetadata` | ✅ Genera título, descripción y OG |
| Llama a WP | ✅ `getConvocatoriaBySlug(slug)` desde `@/lib/wp/convocatorias` |
| `revalidate` | 60 segundos |
| `notFound()` | ✅ Si no existe el slug |

### 4.7 `src/app/cronologia/page.tsx`

| Propiedad | Valor |
|---|---|
| Server Component | ✅ Sí |
| `metadata` exportado | ✅ title: "Cronología" |
| `generateStaticParams` | No aplica |
| `generateMetadata` | No (usa metadata estático) |
| Llama a WP | ✅ `getHitos()` desde `@/lib/wp/hitos` |
| `revalidate` | 3600 segundos (1 hora) |

### 4.8 `src/app/api/revalidate/route.ts`

```typescript
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PATHS = ["/noticias", "/convocatorias", "/cronologia", "/"];

export async function POST(request: NextRequest) {
  const secret =
    request.nextUrl.searchParams.get("secret") ??
    request.headers.get("X-Revalidate-Secret");

  if (secret !== process.env.WP_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  const paths = path ? [path] : DEFAULT_PATHS;

  for (const p of paths) {
    revalidatePath(p);
  }

  return NextResponse.json({
    revalidated: true,
    paths,
    timestamp: new Date().toISOString(),
  });
}
```

| Propiedad | Valor |
|---|---|
| Método | POST |
| Autenticación | ✅ Secret via query param o header `X-Revalidate-Secret` |
| Paths por defecto | `/noticias`, `/convocatorias`, `/cronologia`, `/` |
| Path específico | ✅ Via query param `?path=/noticias/mi-slug` |

**Observación:** Solo acepta POST. No tiene rate limiting (considerar para
producción).

---

## 5. Estructura del directorio `src/lib/`

### ¿Existe `src/lib/`? Sí
### ¿Existe `src/lib/wp/`? Sí

**Archivos encontrados:**

```
src/lib/wp/
├── client.ts        # Cliente HTTP genérico para WP REST API
├── domain.ts        # Tipos de dominio (Noticia, Convocatoria, Hito, Imagen)
├── types.ts         # Tipos raw de la API WP (WPNoticiaRaw, etc.)
├── mappers.ts       # Funciones de mapeo raw → domain + utilidades
├── noticias.ts      # Funciones: getNoticias, getNoticiaBySlug, getAllNoticiaSlugs, getNoticiasDestacadas
├── convocatorias.ts # Funciones: getConvocatorias, getConvocatoriaBySlug, getAllConvocatoriaSlugs
└── hitos.ts         # Funciones: getHitos
```

### Hallazgo crítico

**La capa WP completa ya está implementada, no es un scaffold.**

Esto incluye:
- **`client.ts`**: Cliente HTTP con `fetch` + ISR (`next.revalidate` + `next.tags`).
  Hace `throw` si `WP_API_URL` no está definida.
- **`domain.ts`**: 6 interfaces de dominio completamente tipadas.
- **`types.ts`**: 8 interfaces que modelan la respuesta raw de WP REST API,
  incluyendo `_embedded`, `acf` fields, y taxonomías custom (`categorias-noticia`,
  `tipos-convocatoria`).
- **`mappers.ts`**: 7 funciones de mapeo incluyendo `parseAcfYmdDate` (formato
  ACF `"20260416"` → `Date`), `stripHtml`, `formatDateEs`, y mappers por entidad.
- **`noticias.ts`**, **`convocatorias.ts`**, **`hitos.ts`**: Funciones de fetching
  completas con endpoints WP v2 custom (`/wp/v2/noticias`, `/wp/v2/convocatorias`,
  `/wp/v2/hitos`).

**Esto significa que:**
1. Se asume que WordPress tiene 3 Custom Post Types registrados: `noticias`,
   `convocatorias`, `hitos`
2. Se asume que cada CPT tiene campos ACF específicos (ej: `acf.destacada`,
   `acf.fecha_evento`, `acf.anio`)
3. Se asume taxonomías custom: `categorias-noticia`, `tipos-convocatoria`
4. El build actual consulta la API real de `api.lamarti.org` y pre-renderiza
   contenido (se observan slugs reales en el build output)

**Implicación para Sprint 1B:** La integración WP ya está hecha. El Sprint 1B
debería enfocarse en **validar** que la estructura de CPTs y ACF en WordPress
coincide con los tipos asumidos, no en implementar el cliente desde cero.

---

## 6. Verificación de Variables de Entorno

### 6.1 `.env.example`

```
WP_API_URL=
WP_REVALIDATE_SECRET=
```

Documenta las 2 variables requeridas. Correcto.

### 6.2 `.env.local`

✅ Existe. Contenido no revelado por seguridad.

### 6.3 `.gitignore` y `.env.local`

✅ El `.gitignore` incluye la regla `.env*` (línea 34), que cubre `.env.local`.
El archivo no será trackeado por git.

---

## 7. Estado del Repo Git

### `git status`

```
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
    modified:   docs/INFORME_PROYECTO.md

Untracked files:
    docs/INFORME_SPRINT0.md
    lamarti-web/
```

**Observación:** El directorio `lamarti-web/` completo está sin commitear.
Los archivos de documentación (`INFORME_PROYECTO.md` modificado,
`INFORME_SPRINT0.md` nuevo) también están pendientes.

### `git log --oneline -10`

```
d3976c0 feat: Restructure site with routing, components, and update testimonial quote
d90dd47 feat: Initialize Corporación José Martí website
c930303 Initial commit
```

Solo 3 commits en el repo. El proyecto Next.js aún no ha sido commiteado.

### `git remote -v`

```
origin  https://github.com/apardow/lamarti.git (fetch)
origin  https://github.com/apardow/lamarti.git (push)
```

### `git branch`

```
* main
```

Una sola rama. No se creó rama feature para el Sprint 0.

---

## 8. Validación de Versión Next.js (CRÍTICO)

### 8.1 ¿Por qué 16 en lugar de 15?

El prompt original solicitaba **Next.js 15**. El proyecto usa **Next.js 16.2.3**.

Probablemente `npx create-next-app@latest` instaló la última versión disponible
(16.x) al momento de la creación del proyecto. No hay evidencia de una decisión
deliberada de usar 16 sobre 15.

### 8.2 Compatibilidad con Vercel

Next.js 16 es desplegable en Vercel sin problemas. Vercel es el mantenedor de
Next.js y soporta las versiones más recientes de forma inmediata.

### 8.3 Diferencias relevantes entre 15 y 16

| Aspecto | Next.js 15 | Next.js 16 |
|---|---|---|
| Turbopack | Opt-in (`--turbo`) | Default en dev |
| `params` en pages dinámicas | Síncrono | **Async** (`Promise<{ slug: string }>`) |
| React | 18.x / 19.x RC | 19.x estable |
| App Router | Estable | Estable (mejoras) |
| PPR (Partial Prerendering) | Experimental | Más avanzado |

**Nota:** El código ya usa `params` como `Promise<{ slug: string }>` y hace
`await params` en las rutas dinámicas, lo que es la API de Next.js 16. Un
downgrade a 15 requeriría cambiar estas firmas.

### 8.4 Recomendación

**Mantener Next.js 16.** Razones:
1. El código ya usa la API de Next.js 16 (params async)
2. Downgrade requeriría refactor de rutas dinámicas
3. Vercel soporta 16 nativamente
4. Es la versión estable actual
5. Mejor performance con Turbopack por defecto

---

## 9. Validación del Checklist de Cierre

| Item | Estado | Detalle |
|---|---|---|
| 4 rutas originales migradas con paridad visual y funcional | ✅ Validado | `/`, `/historia`, `/actividades`, `/noticias` presentes con contenido equivalente |
| 6 componentes core portados | ✅ Validado | Navbar, Hero, Stats, ImpactAreas, Testimonial, Footer en `src/components/` |
| Tailwind CSS v4 con tokens idénticos | ✅ Validado | 6 colores + 3 fuentes idénticos al proyecto Vite |
| Assets completos | ✅ Validado | 11 imágenes galería, 5 hero, 3 logos, robots.txt, sitemap.xml |
| SEO migrado a Metadata API | ⚠️ Parcial | OG, Twitter, favicon, robots migrados. **Falta JSON-LD global (Organization)** |
| TypeScript strict | ✅ Validado | `strict: true` en tsconfig.json, `tsc --noEmit` sin errores |
| next.config.ts con remotePatterns | ✅ Validado | `api.lamarti.org` + pathname `/wp-content/uploads/**` |
| Variables de entorno configuradas | ✅ Validado | `.env.example` + `.env.local` presentes, `.gitignore` cubre `.env*` |
| Build exitoso sin errores | ✅ Validado | 0 errores TS, 0 errores ESLint, build completo en 4.5s |
| Componentes WP preparados | ⚠️ Nota | No son scaffolds — son implementaciones completas con estructura asumida. Funcionales pero requieren validación contra WP real |
| Loading states para rutas dinámicas | ✅ Validado | `loading.tsx` en `/noticias` y `/convocatorias` con skeleton UI |
| Endpoint ISR (/api/revalidate) listo | ✅ Validado | POST con autenticación por secret, paths configurables |

---

## 10. Resumen Final y Recomendaciones

### 10.1 Semáforo de Estado

## 🟡 AMARILLO — Avanzar al Sprint 1B con ajustes menores

El Sprint 0 está **sustancialmente completo**. La migración es funcional, el build
pasa, y la paridad visual está lograda. Sin embargo, hay hallazgos que requieren
atención antes o durante el Sprint 1B.

---

### 10.2 Issues Encontrados (por severidad)

#### Severidad ALTA

| # | Issue | Impacto |
|---|---|---|
| 1 | **JSON-LD global `Organization` no migrado** | SEO: Google pierde structured data de la organización. El Vite original lo tenía en `index.html`. Debe agregarse al `layout.tsx` o como `<script>` en el layout. |
| 2 | **Proyecto Next.js no commiteado en git** | Riesgo de pérdida de trabajo. Todo `lamarti-web/` está como untracked. |
| 3 | **Integración WP ya implementada (no scaffold)** | Los tipos y endpoints asumen CPTs y campos ACF específicos que deben validarse contra el WordPress real antes de considerar esto "listo". Si la estructura de WP difiere, habrá errores en runtime. |

#### Severidad MEDIA

| # | Issue | Impacto |
|---|---|---|
| 4 | **`metadataBase` apunta a `new.lamarti.org`** | Correcto para validación. Recordar cambiar a `lamarti.org` al migrar a producción. |
| 5 | **Next.js 16 en lugar de 15** | No es un problema real (ver Fase 8), pero difiere del brief original. Documentar la decisión. |
| 6 | **`lucide-react` upgrade 0.x → 1.x** | Breaking change potencial. Los iconos usados (`ArrowLeft`, `ArrowRight`, `CheckCircle`, `MapPin`, `Calendar`, `Users`) existen en 1.x, pero conviene verificar que no haya cambios de API. |

#### Severidad BAJA

| # | Issue | Impacto |
|---|---|---|
| 7 | **No hay rate limiting en `/api/revalidate`** | Riesgo menor de abuso. Considerar agregar en producción. |
| 8 | **`marti-red` y `marti-orange` son el mismo color** | Intencional (viene del Vite original), pero puede confundir a futuros desarrolladores. Considerar documentar o unificar. |

---

### 10.3 Recomendaciones Concretas

**Para antes del Sprint 1B:**

1. **Commitear el proyecto Next.js** — Crear un commit con todo `lamarti-web/` y
   los archivos de documentación actualizados. Considerar crear una rama
   `feature/nextjs-migration` o commitear directo a `main`.

2. **Agregar JSON-LD global** — Insertar el schema `Organization` en `layout.tsx`
   (puede ser como `<script type="application/ld+json">` en el `<head>` via
   metadata, o directamente en el body).

**Para el Sprint 1B:**

3. **Validar estructura WP contra tipos asumidos** — Los archivos en `src/lib/wp/types.ts`
   asumen CPTs (`noticias`, `convocatorias`, `hitos`) con campos ACF específicos.
   Hacer un `curl` a `api.lamarti.org/wp-json/wp/v2/` para verificar que los
   endpoints existen y la estructura coincide.

4. **Verificar iconos de lucide-react 1.x** — Confirmar que todos los iconos
   importados funcionan correctamente con la versión 1.x.

**Para producción:**

5. **Cambiar `metadataBase`** de `new.lamarti.org` a `lamarti.org`.

6. **Agregar rate limiting** al endpoint `/api/revalidate` (o proteger via
   middleware/WAF de Vercel).

---

### 10.4 ¿Se puede hacer deploy en Vercel sin más cambios?

**Sí, con reservas.** El build pasa, las variables de entorno están documentadas,
y la configuración de Vercel es estándar. El deploy funcionará bajo
`new.lamarti.org` para validación.

**Requisitos mínimos para deploy:**
- Configurar `WP_API_URL` y `WP_REVALIDATE_SECRET` como Environment Variables en
  el dashboard de Vercel
- Apuntar `new.lamarti.org` al proyecto Vercel (CNAME o nameservers)
- El JSON-LD faltante no bloquea el deploy, pero debería agregarse antes de que
  el sitio sea indexado por Google

---

*Fin del informe de validación.*
