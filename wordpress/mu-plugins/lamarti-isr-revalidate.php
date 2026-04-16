<?php
/**
 * Plugin Name: La Martí — ISR Revalidation
 * Description: Notifica a Vercel (Next.js) cuando se publica, edita o elimina
 *              contenido en los CPTs del sitio, disparando revalidación on-demand.
 * Version:     1.0.0
 * Author:      La Martí Dev
 *
 * Instalación: subir este archivo a wp-content/mu-plugins/
 * Los mu-plugins se cargan automáticamente y no se pueden desactivar desde wp-admin.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Configuración
 *
 * VERCEL_REVALIDATE_URL: URL base del endpoint ISR en Vercel (usar www para evitar redirect 307)
 * VERCEL_REVALIDATE_SECRET: debe coincidir con WP_REVALIDATE_SECRET en Vercel
 */
define( 'LAMARTI_REVALIDATE_URL', 'https://www.lamarti.org/api/revalidate' );
define( 'LAMARTI_REVALIDATE_SECRET', 'lamarti_revalidate_2026_xK9pQ2mR7vN4tL8b' );

/**
 * Mapeo CPT → paths a revalidar en Next.js
 *
 * Cada CPT puede revalidar múltiples paths.
 * El placeholder {slug} se reemplaza por el slug del post.
 */
function lamarti_get_revalidation_map(): array {
    return [
        'noticias' => [
            '/',                    // Home (tiene sección "Noticias Destacadas")
            '/noticias',            // Listado
            '/noticias/{slug}',     // Detalle
        ],
        'convocatorias' => [
            '/convocatorias',       // Listado
            '/convocatorias/{slug}',// Detalle
        ],
        'hitos' => [
            '/cronologia',          // Timeline
        ],
    ];
}

/**
 * Hook principal: se dispara cuando un post cambia de estado
 * (draft→publish, publish→trash, publish→publish al editar, etc.)
 */
add_action( 'transition_post_status', 'lamarti_on_post_status_change', 10, 3 );

function lamarti_on_post_status_change( string $new_status, string $old_status, WP_Post $post ): void {
    // Solo actuar si el post pasa a/desde "publish"
    if ( $new_status !== 'publish' && $old_status !== 'publish' ) {
        return;
    }

    $map = lamarti_get_revalidation_map();

    // Solo actuar en CPTs configurados
    if ( ! isset( $map[ $post->post_type ] ) ) {
        return;
    }

    // No disparar en autoguardados ni revisiones
    if ( wp_is_post_autosave( $post->ID ) || wp_is_post_revision( $post->ID ) ) {
        return;
    }

    $paths = $map[ $post->post_type ];

    foreach ( $paths as $path ) {
        $resolved = str_replace( '{slug}', $post->post_name, $path );
        lamarti_revalidate_path( $resolved );
    }
}

/**
 * Envía la petición POST al endpoint de revalidación de Vercel
 */
function lamarti_revalidate_path( string $path ): void {
    $url = add_query_arg(
        [
            'secret' => LAMARTI_REVALIDATE_SECRET,
            'path'   => $path,
        ],
        LAMARTI_REVALIDATE_URL
    );

    $response = wp_remote_post( $url, [
        'timeout'   => 10,
        'blocking'  => false,  // No bloquear la UI de wp-admin
        'sslverify' => true,
    ] );

    // Log para debug (visible en wp-content/debug.log si WP_DEBUG_LOG está activo)
    if ( is_wp_error( $response ) ) {
        error_log( '[LaMarti ISR] Error revalidando ' . $path . ': ' . $response->get_error_message() );
    }
}
