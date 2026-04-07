# Informe de Estado del Proyecto
## Sitio Web — Corporación José Martí de Concepción

**Fecha:** 17 de marzo de 2026
**Estado:** Build exitoso, listo para deploy
**Build output:** `dist/` (index.html + assets CSS/JS)

---

## 1. Resumen General

Sitio web institucional de la Corporación José Martí de Concepción, Chile. Desarrollado en React + TypeScript con Vite como bundler y Tailwind CSS v4 para estilos. El sitio presenta la historia, actividades, noticias y declaraciones de la organización de solidaridad con Cuba.

---

## 2. Stack Tecnológico

| Tecnología | Versión |
|---|---|
| React | 19.0.0 |
| TypeScript | 5.8.2 |
| Vite | 6.4.1 |
| Tailwind CSS | 4.1.14 |
| React Router DOM | 7.13.1 |
| Motion (Framer Motion) | 12.23.24 |
| Lucide React (iconos) | 0.546.0 |

---

## 3. Estructura del Proyecto

```
lamarti/
├── public/
│   └── images/
│       ├── galeria/         # Imágenes de contenido
│       ├── hero/            # Slides del carrusel principal
│       └── logo/            # Logotipos
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── ImpactAreas.tsx
│   │   ├── Testimonial.tsx
│   │   ├── Stories.tsx
│   │   └── ScrollToTop.tsx
│   ├── pages/               # Páginas principales
│   │   ├── HomePage.tsx
│   │   ├── HistoriaPage.tsx
│   │   ├── ActividadesPage.tsx
│   │   └── NoticiasPage.tsx
│   ├── App.tsx              # Router y layout principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind + tema personalizado
├── dist/                    # Build de producción
├── index.html
├── vite.config.ts
├── package.json
└── tsconfig.json
```

---

## 4. Rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | HomePage | Portada con Hero, Stats, Testimonial, ImpactAreas |
| `/historia` | HistoriaPage | Historia de la organización desde 1990 |
| `/actividades` | ActividadesPage | Nota: Asamblea de Solidaridad con Cuba |
| `/noticias` | NoticiasPage | Sistema de tarjetas con noticias y declaraciones |

---

## 5. Contenido Actual

### Página de Actividades
- **Nota destacada:** "La Martí Concepción Reporta Gran Asistencia en Asamblea de Solidaridad con Cuba contra el Bloqueo"
- Imagen principal: `asamblea1.jpeg`
- Imagen interior: `asamblea.jpg`
- Contenido completo con conclusiones y citas

### Página de Noticias y Declaraciones
Sistema de tarjetas (calugas) con vista detalle al hacer clic:

1. **Declaración Pública:** "Solidaridad en Acción frente al Bloqueo Genocida"
   - Imagen: `nobloqueo.jpg`
   - 4 puntos: Denuncia del bloqueo, solidaridad, líneas de trabajo, llamado a la unidad
   - 4 ejes de acción: política, material, redes sociales, agitación y propaganda

2. **Noticia:** "Manos Solidarias: La Martí organiza envío de medicamentos tras exitosa campaña de donaciones"
   - Imagen: `noticiaMedicinaSolidaria.jpg`
   - Cita de Martí, puntos clave de la jornada

### Portada — Sección "Conoce Nuestro Trabajo"
3 tarjetas actualizadas:
1. Nuestra Historia → `/historia`
2. Asamblea de Solidaridad con Cuba → `/actividades`
3. Manos Solidarias: Envío de Medicamentos → `/noticias`

---

## 6. Imágenes en Galería

| Archivo | Uso |
|---|---|
| `actividades.jpg` | Header de Actividades, tarjeta Historia |
| `asamblea1.jpeg` | Imagen principal nota Asamblea |
| `asamblea.jpg` | Imagen interior nota Asamblea |
| `noticias.jpg` | Header de Noticias |
| `nobloqueo.jpg` | Declaración Pública |
| `noticiaMedicinaSolidaria.jpg` | Nota Medicina Solidaria |
| `5.png` | Banner página Historia |
| `4.png`, `6.png`, `7.png`, `8.png` | Galería general |

---

## 7. Tema Visual

**Paleta de colores:**
- `marti-blue`: #004087 (principal)
- `marti-red` / `marti-orange`: #C62828 (acentos)
- `marti-black`: #010006
- `marti-warm`: #FFF5F5 (fondo cálido)
- `marti-gray`: #F8F9FA

**Tipografías:**
- **Montserrat** (700, 800) — títulos y display
- **Inter** (400–700) — cuerpo de texto
- **Lora** (400–700 + itálica) — citas editoriales

---

## 8. Build de Producción

```
dist/index.html           →   0.62 kB (gzip: 0.38 kB)
dist/assets/index.css     →  34.76 kB (gzip: 6.53 kB)
dist/assets/index.js      → 406.38 kB (gzip: 126.58 kB)
```

**Tiempo de build:** 2.43s
**Estado:** Sin errores ni warnings

---

## 9. Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo en puerto 3000
npm run build     # Build de producción → dist/
npm run preview   # Preview del build
npm run clean     # Limpia dist/
npm run lint      # Verificación TypeScript
```

---

## 10. Notas para Deploy

- El build genera una SPA (Single Page Application) en `dist/`
- Requiere configuración de servidor para redirigir todas las rutas a `index.html` (historyApiFallback)
- Las imágenes en `public/` se copian automáticamente al `dist/` durante el build
- No hay variables de entorno requeridas para el frontend
- Puerto de desarrollo: 3000, accesible en todas las interfaces (0.0.0.0)
