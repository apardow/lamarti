# Informe de Cierre — Sprint 0
## Migración React+Vite → Next.js 15 (App Router)
### Sitio Web — Corporación José Martí de Concepción

**Fecha:** 15 de abril de 2026
**Estado:** Completado — listo para deploy en Vercel
**Directorio del proyecto Next.js:** `lamarti-web/`
**Dominio temporal de validación:** `new.lamarti.org`
**Repositorio:** https://github.com/apardow/lamarti

---

## 1. Objetivo del Sprint

Migrar el landing de React+Vite a **Next.js (App Router + TypeScript + Tailwind CSS 4)**,
manteniendo **paridad visual y funcional 100%** con el sitio publicado en `lamarti.org`,
y preparar el deploy en Vercel bajo `new.lamarti.org`.

**Restricción:** Sprint 0 NO toca WordPress. La integración del cliente WP queda
para Sprint 1B, pero se deja preparado el `next.config.ts` con `remotePatterns`
para `api.lamarti.org`.

---

## 2. Stack Migrado

| Tecnología | Vite (antes) | Next.js (después) | Notas |
|---|---|---|---|
| Framework | React 19.0.0 + Vite 6.4.1 | Next.js 16.2.3 + React 19.2.4 | App Router |
| TypeScript | 5.8.2 (no strict) | 5.x (`strict: true`) | Mejora de calidad |
| Tailwind CSS | 4.1.14 (`@tailwindcss/vite`) | 4.x (`@tailwindcss/postcss`) | Mismos tokens |
| Routing | React Router DOM 7.13.1 | Next.js App Router | Eliminado react-router |
| SEO | react-helmet-async 3.0.0 | Next.js Metadata API | Eliminado helmet |
| Animaciones | Motion 12.23.24 | Motion 12.38.0 | Compatible |
| Iconos | Lucide React 0.546.0 | Lucide React 1.8.0 | Upgrade menor |
| Fuentes | Google Fonts via `@import` CSS | `next/font/google` | Carga optimizada |

**Dependencias eliminadas** (reemplazadas por Next.js):
- `react-router-dom` → App Router
- `react-helmet-async` → Metadata API
- `express` → servidor integrado de Next.js
- `better-sqlite3` → no aplica
- `@google/genai` → fuera del alcance del sprint

**Dependencias agregadas:**
- `@tailwindcss/postcss` — integración Tailwind v4 con PostCSS
- `@tailwindcss/typography` — estilos para contenido WP futuro
- `eslint-config-next` — linting específico de Next.js

---

## 3. Paridad de Rutas

| Ruta | Vite | Next.js | Estado |
|---|---|---|---|
| `/` | `HomePage.tsx` | `app/page.tsx` | Migrada |
| `/historia` | `HistoriaPage.tsx` | `app/historia/page.tsx` | Migrada |
| `/actividades` | `ActividadesPage.tsx` | `app/actividades/page.tsx` | Migrada |
| `/noticias` | `NoticiasPage.tsx` | `app/noticias/page.tsx` | Migrada |
| `/noticias/[slug]` | — | `app/noticias/[slug]/page.tsx` | Nueva (WP-ready) |
| `/convocatorias` | — | `app/convocatorias/page.tsx` | Nueva (WP-ready) |
| `/convocatorias/[slug]` | — | `app/convocatorias/[slug]/page.tsx` | Nueva (WP-ready) |
| `/cronologia` | — | `app/cronologia/page.tsx` | Nueva (WP-ready) |
| `/api/revalidate` | — | `app/api/revalidate/` | Nueva (ISR webhook) |

Las 4 rutas originales están migradas. Las 5 rutas nuevas preparan la integración
con WordPress para el Sprint 1B.

---

## 4. Paridad de Componentes

### Componentes core migrados

| Componente | Vite | Next.js | Notas |
|---|---|---|---|
| `Navbar.tsx` | src/components/ | src/components/ | Migrado (Link en vez de react-router) |
| `Hero.tsx` | src/components/ | src/components/ | Migrado (next/image) |
| `Stats.tsx` | src/components/ | src/components/ | Migrado |
| `ImpactAreas.tsx` | src/components/ | src/components/ | Migrado |
| `Testimonial.tsx` | src/components/ | src/components/ | Migrado |
| `Footer.tsx` | src/components/ | src/components/ | Migrado |

### Componentes eliminados intencionalmente

| Componente | Razón |
|---|---|
| `ScrollToTop.tsx` | Innecesario: Next.js App Router resetea scroll automáticamente |
| `SEO.tsx` | Reemplazado por Next.js Metadata API en `layout.tsx` y cada `page.tsx` |
| `Stories.tsx` | No estaba en uso (no importado en HomePage) |

### Componentes nuevos (preparación WP)

| Componente | Propósito |
|---|---|
| `wp/NoticiaCard.tsx` | Tarjeta de noticia desde WP |
| `wp/ConvocatoriaCard.tsx` | Tarjeta de convocatoria desde WP |
| `wp/HitoTimelineItem.tsx` | Ítem de línea de tiempo desde WP |
| `wp/ImagenDestacada.tsx` | Imagen destacada con next/image |
| `wp/BadgeFinalizada.tsx` | Badge de estado para convocatorias |
| `wp/WPContent.tsx` | Renderizado de contenido HTML de WP |

---

## 5. Tokens de Diseño (sin cambios)

### Paleta de colores
| Token | Hex | Uso |
|---|---|---|
| `marti-blue` | #004087 | Color principal |
| `marti-red` / `marti-orange` | #C62828 | Acentos y CTAs |
| `marti-black` | #010006 | Textos oscuros |
| `marti-warm` | #FFF5F5 | Fondo cálido |
| `marti-gray` | #F8F9FA | Fondo neutro |

### Tipografías
| Fuente | Pesos | Variable CSS | Uso |
|---|---|---|---|
| Montserrat | 700, 800 | `--font-display` | Títulos |
| Inter | 400–700 | `--font-sans` | Cuerpo |
| Lora | 400–700 + itálica | `--font-editorial` | Citas editoriales |

Los tokens Tailwind (`@theme` en `globals.css`) son idénticos a los del proyecto Vite
(`index.css`). Se mantiene Tailwind CSS v4 con la misma configuración.

---

## 6. Assets (paridad completa)

```
public/
├── images/
│   ├── galeria/           # 11 imágenes (idéntico)
│   │   ├── 4.png, 5.png, 6.png, 7.png, 8.png
│   │   ├── actividades.jpg, asamblea.jpg, asamblea1.jpeg
│   │   ├── nobloqueo.jpg, noticiaMedicinaSolidaria.jpg
│   │   └── noticias.jpg
│   ├── hero/              # 5 slides (idéntico)
│   │   └── 0.png — 4.png
│   └── logo/              # 3 logos (idéntico)
│       ├── lamarti.png
│       ├── lamarti-logo.png
│       └── lamarti-logoCh.png
├── robots.txt
└── sitemap.xml
```

---

## 7. SEO y Metadatos

| Aspecto | Vite | Next.js | Estado |
|---|---|---|---|
| Meta tags globales | `index.html` hardcoded | `layout.tsx` Metadata API | Migrado |
| Meta tags por página | `SEO.tsx` + react-helmet | `metadata` export en cada `page.tsx` | Migrado |
| Open Graph | En `index.html` | En `layout.tsx` (openGraph) | Migrado |
| Twitter Card | En `index.html` | En `layout.tsx` (twitter) | Migrado |
| Favicon | `logo/lamarti.png` | `icons` en metadata | Migrado |
| robots.txt | `public/robots.txt` | `public/robots.txt` | Sin cambios |
| sitemap.xml | `public/sitemap.xml` | `public/sitemap.xml` | Sin cambios |
| JSON-LD | En `index.html` | Pendiente de verificar en layout | Ver nota |
| `metadataBase` | N/A | `https://new.lamarti.org` | Configurado |

**Nota:** `metadataBase` apunta a `new.lamarti.org` (dominio temporal). Cambiar
a `lamarti.org` cuando se migre a producción.

---

## 8. Configuración Técnica

### next.config.ts
```typescript
{
  turbopack: { root: path.resolve(__dirname) },
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "api.lamarti.org",
      pathname: "/wp-content/uploads/**"
    }]
  }
}
```
- `remotePatterns` configurado para WordPress headless
- Turbopack habilitado

### tsconfig.json
- `strict: true` (mejora respecto al proyecto Vite)
- Path alias `@/*` → `./src/*`
- Plugins de Next.js configurados

### Variables de entorno
| Variable | Valor | Propósito |
|---|---|---|
| `WP_API_URL` | `https://api.lamarti.org/wp-json` | Endpoint WordPress REST API |
| `WP_REVALIDATE_SECRET` | (configurado en `.env.local`) | Secret para ISR on-demand |

---

## 9. Estructura Final del Proyecto Next.js

```
lamarti-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout global (fuentes, Navbar, Footer, metadata)
│   │   ├── page.tsx                # Portada
│   │   ├── globals.css             # Tailwind v4 + @theme tokens
│   │   ├── historia/page.tsx
│   │   ├── actividades/page.tsx
│   │   ├── noticias/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── convocatorias/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── cronologia/page.tsx
│   │   └── api/revalidate/         # ISR webhook
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── Stats.tsx
│       ├── ImpactAreas.tsx
│       ├── Testimonial.tsx
│       ├── Footer.tsx
│       └── wp/                     # Componentes WordPress
│           ├── NoticiaCard.tsx
│           ├── ConvocatoriaCard.tsx
│           ├── HitoTimelineItem.tsx
│           ├── ImagenDestacada.tsx
│           ├── BadgeFinalizada.tsx
│           └── WPContent.tsx
├── public/                         # Assets estáticos (idénticos al original)
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── package.json
└── package-lock.json
```

---

## 10. Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo (Turbopack)
npm run build     # Build de producción
npm run start     # Servidor de producción
npm run lint      # ESLint
```

---

## 11. Checklist de Cierre

- [x] 4 rutas originales migradas con paridad visual y funcional
- [x] 6 componentes core portados a Next.js
- [x] Tailwind CSS v4 con tokens idénticos
- [x] Assets completos (imágenes, logos, favicons)
- [x] SEO migrado a Metadata API (OG, Twitter Card, favicon, robots)
- [x] TypeScript `strict: true`
- [x] `next.config.ts` con `remotePatterns` para `api.lamarti.org`
- [x] Variables de entorno configuradas para WP
- [x] Build exitoso sin errores
- [x] Componentes WP preparados para Sprint 1B
- [x] Loading states para rutas dinámicas
- [x] Endpoint ISR (`/api/revalidate`) listo

---

## 12. Pendientes para Próximos Sprints

### Sprint 1B — Integración WordPress
- [ ] Conectar páginas dinámicas (`/noticias`, `/convocatorias`, `/cronologia`) con WP REST API
- [ ] Validar ISR on-demand con webhook de WordPress
- [ ] Verificar rendering de contenido WP con `@tailwindcss/typography`

### Deploy
- [ ] Deploy en Vercel bajo `new.lamarti.org`
- [ ] Configurar dominio temporal en Vercel
- [ ] Validar Lighthouse score post-deploy
- [ ] Cambiar `metadataBase` a `lamarti.org` cuando se migre a producción

### Mejoras generales
- [ ] Optimización de imágenes (WebP/AVIF via next/image)
- [ ] Analytics (Google Analytics o Plausible)
- [ ] Formulario de contacto funcional
