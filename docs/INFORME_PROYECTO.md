# Informe de Estado del Proyecto
## Sitio Web — Corporación José Martí de Concepción

**Fecha de actualización:** 7 de abril de 2026
**Estado general:** Build exitoso, listo para deploy
**Build output:** `dist/` (index.html + assets CSS/JS)
**Repositorio:** https://github.com/apardow/lamarti
**Rama principal:** main

---

## 1. Resumen General

Sitio web institucional de la Corporación José Martí de Concepción, Chile. Desarrollado en React + TypeScript con Vite como bundler y Tailwind CSS v4 para estilos. El sitio presenta la historia, actividades, noticias y declaraciones de la organización de solidaridad internacionalista.

---

## 2. Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19.0.0 | UI framework |
| TypeScript | 5.8.2 | Tipado estático |
| Vite | 6.4.1 | Bundler y dev server |
| Tailwind CSS | 4.1.14 | Estilos utilitarios |
| React Router DOM | 7.13.1 | Navegación SPA |
| React Helmet Async | 3.0.0 | SEO y metadatos por página |
| Motion (Framer Motion) | 12.23.24 | Animaciones |
| Lucide React | 0.546.0 | Iconografía |

---

## 3. Estructura del Proyecto

```
lamarti/
├── public/
│   ├── images/
│   │   ├── galeria/         # Imágenes de contenido
│   │   ├── hero/            # Slides del carrusel principal (0-4.png)
│   │   └── logo/            # Logotipos (lamarti.png, lamarti-logo.png)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.tsx       # Navegación principal con menú móvil
│   │   ├── Footer.tsx       # Pie de página con contacto y redes
│   │   ├── Hero.tsx         # Carrusel de imágenes principal
│   │   ├── Stats.tsx        # Barra de estadísticas
│   │   ├── ImpactAreas.tsx  # Tarjetas de áreas de impacto
│   │   ├── Testimonial.tsx  # Cita destacada + "Quiénes somos"
│   │   ├── Stories.tsx      # Historias de impacto
│   │   ├── ScrollToTop.tsx  # Reset scroll en cambio de ruta
│   │   └── SEO.tsx          # Componente de metadatos por página
│   ├── pages/               # Páginas principales
│   │   ├── HomePage.tsx     # Portada
│   │   ├── HistoriaPage.tsx # Historia de la organización
│   │   ├── ActividadesPage.tsx # Actividades y asambleas
│   │   └── NoticiasPage.tsx # Noticias y declaraciones
│   ├── App.tsx              # Router y layout principal
│   ├── main.tsx             # Entry point con HelmetProvider
│   └── index.css            # Tailwind + tema personalizado
├── docs/                    # Documentación del proyecto
├── dist/                    # Build de producción
├── index.html               # HTML base con SEO y JSON-LD
├── vite.config.ts
├── package.json
└── tsconfig.json
```

---

## 4. Rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | HomePage | Portada con Hero, Stats, Testimonial, ImpactAreas, Stories |
| `/historia` | HistoriaPage | Historia de la organización desde 1990 |
| `/actividades` | ActividadesPage | Asamblea de Solidaridad con Cuba |
| `/noticias` | NoticiasPage | Sistema de tarjetas con noticias y declaraciones |

---

## 5. Contenido Actual

### Portada
- **Hero:** Carrusel con 5 imágenes (0-4.png)
- **Stats:** Años de historia, proyectos activos, voluntarios, vidas impactadas
- **Cita destacada:** "Solidaridad es el nombre político que tiene el amor." — Joel Suárez, Centro Martín Luther King (Cuba)
- **Áreas de impacto:** Solidaridad con Cuba, Formación Política, Cultura y Encuentro
- **Sección "Conoce Nuestro Trabajo":** 3 tarjetas enlazando a Historia, Actividades y Noticias

### Página de Actividades
- **Nota destacada:** "La Martí Concepción Reporta Gran Asistencia en Asamblea de Solidaridad con Cuba contra el Bloqueo"
- Imágenes: `asamblea1.jpeg`, `asamblea.jpg`
- Contenido completo con conclusiones y citas

### Página de Noticias y Declaraciones
Sistema de tarjetas con vista detalle al hacer clic:

1. **Declaración Pública:** "Solidaridad en Acción frente al Bloqueo Genocida"
   - Imagen: `nobloqueo.jpg`
   - 4 puntos: Denuncia del bloqueo, solidaridad, líneas de trabajo, llamado a la unidad
   - 4 ejes de acción: política, material, redes sociales, agitación y propaganda

2. **Noticia:** "Manos Solidarias: La Martí organiza envío de medicamentos tras exitosa campaña de donaciones"
   - Imagen: `noticiaMedicinaSolidaria.jpg`
   - Cita de Martí, puntos clave de la jornada

---

## 6. Imágenes

### Hero (carrusel)
| Archivo | Uso |
|---|---|
| `hero/0.png` a `hero/4.png` | Slides del carrusel principal |

### Galería
| Archivo | Uso |
|---|---|
| `galeria/actividades.jpg` | Header de Actividades, tarjeta Historia |
| `galeria/asamblea1.jpeg` | Imagen principal nota Asamblea |
| `galeria/asamblea.jpg` | Imagen interior nota Asamblea |
| `galeria/noticias.jpg` | Header de Noticias |
| `galeria/nobloqueo.jpg` | Declaración Pública |
| `galeria/noticiaMedicinaSolidaria.jpg` | Nota Medicina Solidaria |
| `galeria/5.png` | Banner página Historia |
| `galeria/4.png`, `6.png`, `7.png`, `8.png` | Galería general |

### Logos
| Archivo | Uso |
|---|---|
| `logo/lamarti.png` | Favicon, Open Graph, JSON-LD |
| `logo/lamarti-logo.png` | Logo alternativo |
| `logo/lamarti-logoCh.png` | Logo compacto |

---

## 7. SEO y Metadatos

- **HTML base** (`index.html`): Open Graph, Twitter Card, JSON-LD (Organization schema)
- **Componente SEO** (`SEO.tsx`): Metadatos dinámicos por página via `react-helmet-async`
- **robots.txt** y **sitemap.xml** en `public/`
- Dominio configurado: `lamarti.cl`

---

## 8. Tema Visual

**Paleta de colores:**
| Token | Hex | Uso |
|---|---|---|
| `marti-blue` | #004087 | Color principal |
| `marti-red` / `marti-orange` | #C62828 | Acentos y CTAs |
| `marti-black` | #010006 | Textos oscuros |
| `marti-warm` | #FFF5F5 | Fondo cálido |
| `marti-gray` | #F8F9FA | Fondo neutro |

**Tipografías:**
| Fuente | Pesos | Uso |
|---|---|---|
| Montserrat | 700, 800 | Títulos y display (`font-display`) |
| Inter | 400–700 | Cuerpo de texto (`font-sans`) |
| Lora | 400–700 + itálica | Citas editoriales (`font-editorial`) |

---

## 9. Build de Producción

```
dist/index.html                    2.79 kB (gzip:   0.93 kB)
dist/assets/index-DujzYTDC.css    34.76 kB (gzip:   6.53 kB)
dist/assets/index-CPv6MQPp.js    425.83 kB (gzip: 132.88 kB)
```

**Tiempo de build:** ~2.2s
**Estado:** Sin errores ni warnings

---

## 10. Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo en puerto 3000 (0.0.0.0)
npm run build     # Build de producción → dist/
npm run preview   # Preview del build de producción
npm run clean     # Limpia dist/
npm run lint      # Verificación TypeScript (tsc --noEmit)
```

---

## 11. Notas para Deploy

- El build genera una **SPA** (Single Page Application) en `dist/`
- **Requiere** configuración de servidor para redirigir todas las rutas a `index.html` (historyApiFallback)
- Las imágenes en `public/` se copian automáticamente al `dist/` durante el build
- No hay variables de entorno requeridas para el frontend
- Puerto de desarrollo: 3000, accesible en todas las interfaces (0.0.0.0)
- Para Vercel: agregar un archivo `vercel.json` con rewrites a `index.html`

---

## 12. Historial de Commits

| Hash | Mensaje |
|---|---|
| `d3976c0` | feat: Restructure site with routing, components, and update testimonial quote |
| `d90dd47` | feat: Initialize Corporación José Martí website |
| `c930303` | Initial commit |

---

## 13. Pendientes / Próximos Pasos

- [ ] Deploy a hosting (Vercel, Netlify u otro)
- [ ] Configurar dominio `lamarti.cl`
- [ ] Agregar formulario de contacto funcional
- [ ] Conectar redes sociales reales (Facebook, Instagram)
- [ ] Agregar más noticias y actividades
- [ ] Optimización de imágenes (WebP/AVIF)
- [ ] Analytics (Google Analytics o Plausible)
