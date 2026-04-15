# Diagnóstico de Estructura para Deploy en Vercel

**Fecha:** 15 de abril de 2026
**Repo:** github.com/apardow/lamarti (branch `main`)

---

## Root Directory recomendado para Vercel

```
lamarti-web
```

En el dashboard de Vercel, al importar el repo, configurar:
- **Root Directory:** `lamarti-web`
- **Framework Preset:** Next.js (autodetectado)
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)

---

## Estructura detectada

```
C:/laragon/www/lamarti/          ← Repo root (NO es la app Next.js)
├── lamarti-web/                 ← App Next.js (Root Directory para Vercel)
│   ├── src/app/                 ← App Router pages
│   ├── src/components/          ← Componentes
│   ├── src/lib/wp/              ← Cliente WordPress
│   ├── public/                  ← Assets estáticos
│   ├── next.config.ts           ← Config Next.js
│   ├── tsconfig.json
│   ├── package.json             ← name: "lamarti-web", next: 16.2.3
│   ├── .env.local               ← Variables locales (NO commiteado)
│   └── .env.example             ← Template de variables
├── src/                         ← App Vite ORIGINAL (legacy, no tocar)
├── dist/                        ← Build Vite (legacy)
├── docs/                        ← Documentación
├── package.json                 ← name: "react-example" (Vite, NO usar)
├── vite.config.ts               ← Config Vite (legacy)
└── Lamarti/                     ← Carpeta vacía (ver alertas)
```

- **Repo root:** `C:/laragon/www/lamarti/`
- **Next.js app:** `C:/laragon/www/lamarti/lamarti-web/`
- **Es monorepo:** NO — es un repo con el proyecto Vite legacy en la raíz y el Next.js en subcarpeta

### package.json encontrados

| Ruta | Name | Framework | Es el correcto |
|---|---|---|---|
| `./package.json` | `react-example` | Vite | NO |
| `./lamarti-web/package.json` | `lamarti-web` | Next.js 16.2.3 | **SI** |
| `./lamarti-web/.next/package.json` | — | Build output | NO |

---

## Variables de entorno requeridas

Variables que el código consume via `process.env.*`:

| Variable | Archivo | Propósito | Tipo |
|---|---|---|---|
| `WP_API_URL` | `src/lib/wp/client.ts` | URL base de la API WordPress | Server-side |
| `WP_REVALIDATE_SECRET` | `src/app/api/revalidate/route.ts` | Secret para ISR on-demand | Server-side |

**Valores para configurar en Vercel (Environment Variables):**

```
WP_API_URL=https://api.lamarti.org/wp-json
WP_REVALIDATE_SECRET=<copiar de .env.local>
```

Ambas son server-side (sin prefijo `NEXT_PUBLIC_`), por lo que no se exponen al cliente.

---

## Archivos de configuración presentes

| Archivo | Existe | Notas |
|---|---|---|
| `next.config.ts` | SI | Turbopack + remotePatterns para api.lamarti.org |
| `tsconfig.json` | SI | strict: true, alias @/* |
| `.env.local` | SI | NO commiteado (cubierto por .gitignore `.env*`) |
| `.env.example` | SI | Documenta WP_API_URL y WP_REVALIDATE_SECRET |
| `.env.production` | NO | No existe — las variables se configuran en Vercel |
| `postcss.config.mjs` | SI | Tailwind v4 via @tailwindcss/postcss |
| `eslint.config.mjs` | SI | ESLint 9 + eslint-config-next |

---

## Estado git

- **Working tree:** Limpio (nothing to commit)
- **Branch:** `main` (up to date with origin/main)
- **Último commit:** `9b142be` — feat(sprint-1b): integración WordPress + noticias destacadas en home
- **Remote:** `origin https://github.com/apardow/lamarti.git`

---

## Observaciones / Alertas

1. **Carpeta `Lamarti/` vacía en la raíz** — Existe una carpeta con mayúscula
   inicial que está vacía y no está trackeada por git. Posible artefacto de una
   operación de filesystem. Considerar eliminarla para evitar confusión.

2. **Proyecto Vite legacy en la raíz** — El repo mantiene el proyecto React+Vite
   original (`package.json` con name `react-example`, `vite.config.ts`, `src/`,
   `dist/`). Vercel NO debe usar la raíz del repo como root directory. Si en el
   futuro se quiere limpiar, se puede mover el legacy a una subcarpeta `legacy/`
   o eliminarlo.

3. **`.env.local` no está en el repo** — Correcto para seguridad. Las variables
   deben configurarse manualmente en Vercel Dashboard > Settings > Environment
   Variables.

4. **No hay `.env.production`** — No es necesario si las variables se configuran
   en Vercel directamente. Solo asegurarse de configurarlas para los entornos
   Production, Preview y Development.

5. **Node.js version** — Next.js 16.2.3 requiere Node >= 18.17. Vercel usa
   Node 20 por defecto, por lo que no debería haber problema. Si se quiere
   ser explícito, agregar un campo `engines` al package.json o configurar en
   Vercel Settings > General > Node.js Version.
