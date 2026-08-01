<?php
/**
 * Legacy URL redirects.
 *
 * The Jekyll source served pages as .html paths
 * (/components/accordion.html). This maps them to the WP permalinks
 * (/components/accordion/) with 301s so bookmarks and search engines
 * survive the migration.
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Redirect legacy .html paths to their WordPress equivalents.
 */
function nds_redirect_legacy_urls() {
	if ( ! is_404() ) {
		return;
	}

	$path = isset( $_SERVER['REQUEST_URI'] ) ? esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';
	$path = wp_parse_url( $path, PHP_URL_PATH );

	if ( null === $path || ! preg_match( '#\.html$#', $path ) ) {
		return;
	}

	$new = preg_replace( '#\.html$#', '/', $path );
	$new = trim( $new, '/' );

	// Fold known roots: /components/index.html -> /components/.
	if ( preg_match( '#^(components|templates|examples|layout|utilities|events|ui-shell)/index$#', $new ) ) {
		$new = substr( $new, 0, strrpos( $new, '/' ) );
	}

	if ( '' === $new ) {
		return;
	}

	wp_safe_redirect( home_url( '/' . $new . '/' ), 301 );
	exit;
}
add_action( 'template_redirect', 'nds_redirect_legacy_urls' );
