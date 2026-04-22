# Sprint 1.5 — Report

Cierre de pendientes previos al primer deploy a Vercel.

## 1. Qué se implementó

### Sección "Noticias Destacadas" en el home
- `src/app/page.tsx`: bloque server-side que se inserta inmediatamente después
  de `ImpactAreas` ("Conoce Nuestro Trabajo").
- Trae hasta 6 noticias marcadas con `acf.destacada=true`. Si no hay ninguna
  destacada, la sección no se renderiza.
- Grid responsive 1 / 2 / 3 columnas, reutiliza `NoticiaCard` y mantiene los
  tokens visuales (`bg-marti-gray`, `text-marti-blue`, `font-display`).
- Incluye CTA "Ver todas las noticias" hacia `/noticias`.

### JSON-LD del NGO en el layout
- `src/app/layout.tsx`: se emite un bloque `<script type="application/ld+json">`
  como primer hijo del `<body>`, antes del `Navbar`.
- Schema.org tipo `NGO` con `name`, `alternateName`, `url`, `logo`,
  `foundingDate`, `description`, `address` (PostalAddress) y `sameAs` vacío
  (no se encontraron URLs reales de redes sociales en el footer; quedan los
  placeholders `#`, así que `sameAs: []` es correcto por ahora).

### Rediseño de `/cronologia` con acordeón por años
- `src/lib/wp/hitos.ts`:
  - Paginación REST (`per_page=100`) en `getAllHitos()` para soportar 100+
    hitos. `getHitos()` ahora delega en `getAllHitos()` para no romper
    consumidores.
  - Función `agruparHitosPorAnio(hitos)` que agrupa por año y elige al azar
    una imagen representativa entre los hitos del año que tengan imagen
    (o `null` si ninguno la tiene).
- `src/components/wp/CronologiaAccordion.tsx` (`'use client'`):
  - `useState` con un único año abierto a la vez.
  - Animación suave con `motion/react` (`AnimatePresence` + height/opacity).
  - Cada fila colapsada: thumbnail 120x80 + año en `font-display` + contador
    + chevron rotativo. Si no hay imagen, placeholder `bg-marti-blue` con el
    año dentro.
  - Línea vertical sutil (`bg-marti-blue/15`) detrás de la columna de
    thumbnails, manteniendo la sensación de timeline.
  - `loading="eager"` en los primeros 4 thumbnails, `lazy` en el resto.
- `src/app/cronologia/page.tsx`: se reduce a fetch + agrupación en el server
  component y delega la UI al `CronologiaAccordion` cliente.

## 2. Decisiones técnicas

- **Filtrado de "destacadas"**: ACF en su versión free no expone meta-queries
  fiables vía REST, así que se traen hasta 100 noticias y se filtra en
  memoria por `noticia.destacada === true`. La función ya estaba prevista
  en `getNoticiasDestacadas` con su comentario explicando la decisión.
- **Agrupación de hitos**: se eligió `Map<number, Hito[]>` por orden de
  inserción + sort por `anio` ascendente. La imagen representativa se
  resuelve por `Math.random` sobre los hitos del año con imagen (decisión
  intencionalmente simple; se puede determinizar más adelante si se quiere
  evitar reshuffle entre revalidaciones).
- **Patrón Server + Client**: la página `/cronologia` queda como Server
  Component que hace fetch y agrupación; el componente cliente sólo recibe
  datos serializados como prop. Esto mantiene el bundle JS mínimo y
  preserva la posibilidad de prerender estático con `revalidate=3600`.
- **Sin librerías de acordeón**: implementado con HTML semántico
  (`<button aria-expanded aria-controls>`) + `motion/react` ya instalado.
- **Paginación defensiva**: el bucle `while (hasMore)` rompe cuando un batch
  trae menos de 100 items o cuando WP responde 4xx (capturado en `try/catch`).

## 3. Issues encontrados

- **Build bloqueada por `/convocatorias` con `fecha_evento = "null"`**:
  preexistente, fuera del alcance del Sprint 1.5. Una convocatoria publicada
  en WP no tiene `fecha_evento` ACF, lo que rompía `parseAcfYmdDate` durante
  el prerender de `/convocatorias` y `/convocatorias/58`.
  - Mitigación aplicada (defensiva, no reescribe lógica que funciona):
    `getConvocatorias` filtra con `try/catch` los items cuyo mapeo lance, y
    `getConvocatoriaBySlug` retorna `null` (que dispara `notFound()`) si el
    mapeo falla. Esto desbloquea la build sin alterar el comportamiento de
    los items válidos.
  - **Acción pendiente (fuera del sprint)**: completar el campo `fecha_evento`
    de la convocatoria con `id=58` en WP, o tornar opcional la fecha en el
    mapper si esa nueva semántica es deseada.
- No se detectaron URLs reales de redes sociales en el `Footer` (todos los
  enlaces son `#`), por lo que `sameAs: []` quedó vacío como indica el
  spec. Cuando existan, agregarlos al `orgJsonLd` en `layout.tsx`.

## 4. Estado del build final

```
> next build
✓ Compiled successfully in 2.6s
✓ Generating static pages (29/29)
```

Rutas relevantes prerenderizadas:
- `/` (con sección "Noticias Destacadas" embebida)
- `/cronologia` (acordeón colapsado por defecto)
- `/convocatorias` y `/convocatorias/[slug]` (con la mitigación defensiva)
- `/noticias` y `/noticias/[slug]`

Verificación visual rápida vía dev server (puerto 3000):
- `GET /` → 200; HTML contiene `application/ld+json`, `"@type":"NGO"` y
  `Noticias Destacadas`.
- `GET /cronologia` → 200; HTML contiene `aria-expanded` (controles del
  acordeón) y los textos de hitos.

## 5. Próximo paso recomendado

Deploy inicial a Vercel:

1. Conectar el repo, seleccionar `lamarti-web/` como root del proyecto.
2. Configurar variables de entorno en Vercel:
   - `WP_API_URL` → `https://api.lamarti.org/wp-json`
   - Cualquier secret usado por `/api/revalidate` (token ISR).
3. Verificar que el dominio `api.lamarti.org` quede explícito en
   `next.config.ts > images.remotePatterns` (ya está).
4. Tras el deploy, smoke test de las 3 features:
   - Home → ver sección "Noticias Destacadas".
   - View-source del home → confirmar JSON-LD `NGO`.
   - `/cronologia` → expandir/colapsar varios años.
5. Pendiente paralelo (no bloqueante): corregir el ACF `fecha_evento` del
   item de convocatoria `id=58` en WP.
