# Informe: Webhook WordPress → Next.js ISR On-Demand
## Estado del arte y alternativas

**Fecha:** 16 de abril de 2026
**Proyecto:** lamarti.org
**Objetivo:** Que al publicar/editar/eliminar contenido en WordPress
(`api.lamarti.org`), el sitio Next.js (`www.lamarti.org`) se actualice
automáticamente sin rebuild completo.

---

## Situación actual

El endpoint ISR ya existe y funciona en producción:

```
POST https://www.lamarti.org/api/revalidate?secret=<secret>
```

| Test | Resultado |
|---|---|
| Secret correcto, sin path | Revalida `/noticias`, `/convocatorias`, `/cronologia`, `/` |
| Secret correcto, con `&path=/noticias` | Revalida solo `/noticias` |
| Secret incorrecto | 401 `{"error":"Invalid secret"}` |

**Falta:** el disparador desde WordPress. Cuando un editor publica una
noticia, nada notifica a Vercel. Hay que conectar WP → endpoint.

**Nota técnica:** el dominio `lamarti.org` redirige (307) a `www.lamarti.org`.
El webhook debe usar la URL con `www` para evitar que el redirect convierta
el POST en GET.

---

## Alternativas evaluadas

### 1. mu-plugin con `wp_remote_post` (RECOMENDADO)

Un archivo PHP en `wp-content/mu-plugins/` que escucha los hooks nativos de
WordPress (`save_post`, `transition_post_status`, `delete_post`) y hace un
`wp_remote_post` al endpoint de revalidación.

```
wp-content/mu-plugins/lamarti-isr-revalidate.php
```

| Aspecto | Detalle |
|---|---|
| **Complejidad** | Baja (~50 líneas de PHP) |
| **Costo** | Gratis |
| **Revalidación selectiva** | Si — inspecciona `$post->post_type` y construye el path exacto |
| **Compatible con el endpoint existente** | Si, directamente |
| **Dependencias externas** | Ninguna |
| **UI de administración** | No (solo código) |
| **Monitoreo de fallos** | Manual (logs de WP o `error_log()`) |
| **Se puede desactivar accidentalmente** | No (mu-plugins cargan siempre) |

**Ventajas:**
- Zero dependencias, zero plugins de terceros
- Control total: qué CPTs disparan, qué paths revalidan
- `wp_remote_post` sigue redirects por defecto (hasta 5)
- Es la recomendación oficial de Next.js para headless WP
- Al ser mu-plugin, no se desactiva por error desde wp-admin

**Desventajas:**
- Sin UI para ver historial de disparos
- Reintentos y manejo de errores son manuales
- Requiere acceso al filesystem del servidor (cPanel/SSH)

---

### 2. Snippet en `functions.php` del tema

Mismo código que la opción 1, pero dentro del `functions.php` del tema activo.

| Aspecto | Detalle |
|---|---|
| **Complejidad** | Baja |
| **Costo** | Gratis |
| **Revalidación selectiva** | Si |
| **Compatible con el endpoint** | Si |

**Ventajas:**
- Editable desde wp-admin (Apariencia → Editor de archivos)
- No requiere acceso SSH

**Desventajas:**
- Se pierde si se cambia de tema
- Se puede romper con una actualización del tema
- Menos robusto que mu-plugin

---

### 3. Plugin WP Webhooks (gratuito + pro)

Plugin con UI para configurar webhooks salientes en eventos de WordPress.

| Aspecto | Detalle |
|---|---|
| **Complejidad** | Baja (UI visual) |
| **Costo** | Gratis (básico) / $149/año (Pro) |
| **Revalidación selectiva** | Parcial en free, completa en Pro |
| **Compatible con el endpoint** | Si (secret en URL query string) |

**Ventajas:**
- UI visual para configurar endpoints
- Logs de entregas (Pro)
- Reintentos automáticos (Pro)

**Desventajas:**
- Free envía payload fijo — no controla qué path revalidar por CPT
- Agrega un plugin más al WP (mantenimiento, actualizaciones)
- Pro es de pago ($149/año)
- Overkill para un solo endpoint

---

### 4. Vercel Deploy Hooks

URL proporcionada por Vercel que dispara un rebuild completo del sitio.

| Aspecto | Detalle |
|---|---|
| **Complejidad** | Trivial (un URL, un click) |
| **Costo** | Gratis (pero consume minutos de build) |
| **Revalidación selectiva** | No — rebuild completo |
| **Compatible con el endpoint** | No — lo reemplaza |

**Ventajas:**
- Configuración en 30 segundos
- No requiere código en WP ni en Next.js

**Desventajas:**
- **Rebuild completo** cada vez que se guarda un post (minutos, no milisegundos)
- Consume minutos de build del plan Vercel
- No es ISR — es regeneración total
- Ineficiente para ediciones frecuentes

---

### 5. WPGraphQL + Smart Cache

Usa GraphQL con invalidación por tags. El plugin `wp-graphql-smart-cache`
invalida queries cacheadas cuando cambian los datos subyacentes.

| Aspecto | Detalle |
|---|---|
| **Complejidad** | Alta |
| **Costo** | Gratis (open source) |
| **Revalidación selectiva** | Si (por tags) |
| **Compatible con el endpoint** | No — paradigma diferente |

**Ventajas:**
- Elegante si ya usás GraphQL
- Invalidación granular por cache tags

**Desventajas:**
- **El proyecto usa REST, no GraphQL** — requiere migrar todo el data layer
- Cambio de alcance significativo
- No justificado para este proyecto

---

### 6. Plugins headless (Faust.js, Atlas, Flavor)

Frameworks/plugins diseñados para WordPress headless con soporte de
revalidación integrado.

| Aspecto | Detalle |
|---|---|
| **Complejidad** | Media-Alta |
| **Costo** | Varía (Faust.js gratis pero opinionado) |
| **Revalidación selectiva** | Si (Faust.js) |
| **Compatible con el endpoint** | No — asumen su propia arquitectura |

**Ventajas:**
- Solución "todo en uno" para headless WP

**Desventajas:**
- Lock-in a frameworks específicos
- Faust.js asume su propio data layer (no compatible con el cliente WP existente)
- Algunos atados a hosting específico (WP Engine/Atlas)
- Overkill para este proyecto

---

## Tabla comparativa

| Criterio | mu-plugin | functions.php | WP Webhooks | Deploy Hook | GraphQL | Headless plugins |
|---|---|---|---|---|---|---|
| Complejidad | Baja | Baja | Baja | Trivial | Alta | Media-Alta |
| Costo | Gratis | Gratis | Free/$149 | Gratis | Gratis | Varía |
| Revalidación selectiva | Si | Si | Parcial | No | Si | Si |
| Compatible con endpoint actual | Si | Si | Si | No | No | No |
| Requiere plugin externo | No | No | Si | No | Si | Si |
| Se desactiva por error | No | Si | Si | No | Si | Si |
| UI de monitoreo | No | No | Si (Pro) | Si | No | Si |
| Velocidad de revalidación | ~200ms | ~200ms | ~200ms | Minutos | ~200ms | ~200ms |

---

## Recomendación

### mu-plugin con `wp_remote_post`

Es la mejor opción para este proyecto por:

1. **Zero dependencias** — no agrega plugins al WP
2. **Compatible directo** con el endpoint `/api/revalidate` que ya existe
3. **Revalidación selectiva** por CPT (noticias → `/noticias`, etc.)
4. **Recomendación oficial** de Next.js para headless WordPress
5. **No se desactiva** accidentalmente (mu-plugins siempre cargan)
6. **~50 líneas de PHP** — implementación en minutos

### Implementación propuesta

```
POST https://www.lamarti.org/api/revalidate
  ?secret=<WP_REVALIDATE_SECRET>
  &path=/noticias           ← cuando se edita una noticia
  &path=/convocatorias      ← cuando se edita una convocatoria
  &path=/cronologia         ← cuando se edita un hito
```

**Mapeo CPT → Path:**

| Custom Post Type | Path a revalidar | Adicional |
|---|---|---|
| `noticias` | `/noticias` | También `/noticias/<slug>` y `/` (home tiene destacadas) |
| `convocatorias` | `/convocatorias` | También `/convocatorias/<slug>` |
| `hitos` | `/cronologia` | — |

---

## Consideraciones de seguridad

| Riesgo | Mitigación |
|---|---|
| Secret en query string visible en logs | Aceptable para server-to-server. Alternativa: mover a header `X-Revalidate-Secret` |
| Timing attacks en comparación de secret | Usar `hash_equals()` en PHP y `timingSafeEqual` en Node.js |
| Replay de requests | Riesgo bajo (peor caso: revalidación extra). Si se quiere proteger: agregar timestamp + HMAC |
| Redirect POST → GET | Usar `https://www.lamarti.org/...` directamente (evitar el redirect 307) |

---

## Próximo paso

Implementar `wp-content/mu-plugins/lamarti-isr-revalidate.php` en
`api.lamarti.org` con acceso via cPanel o SSH.
