# WordPress — Archivos para api.lamarti.org

Este directorio contiene archivos que deben subirse manualmente al
WordPress headless en `api.lamarti.org` via cPanel o SSH.

## mu-plugins/lamarti-isr-revalidate.php

**Destino:** `wp-content/mu-plugins/lamarti-isr-revalidate.php`

Notifica a Vercel cuando se publica, edita o elimina contenido en los
CPTs (noticias, convocatorias, hitos), disparando ISR on-demand.

### Instalación

1. Acceder a cPanel → File Manager (o via SSH/SFTP)
2. Navegar a `wp-content/`
3. Crear carpeta `mu-plugins/` si no existe
4. Subir `lamarti-isr-revalidate.php` dentro
5. No requiere activación — los mu-plugins cargan automáticamente

### Verificación

1. Publicar o editar una noticia en wp-admin
2. Verificar que el sitio en www.lamarti.org refleja el cambio en ~1 minuto
3. Si `WP_DEBUG_LOG` está activo, revisar `wp-content/debug.log` para errores
