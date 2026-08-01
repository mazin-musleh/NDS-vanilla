<?php
/**
 * Menu locations. Used by the custom sidemenu/mega-menu blocks (Phase 2)
 * and available to wp_nav_menu-based parts.
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register menu locations.
 */
function nds_register_menus() {
	register_nav_menus(
		array(
			'primary'  => __( 'Primary Navigation', 'nds-theme' ),
			'actions'  => __( 'Actions (search, user, notifications)', 'nds-theme' ),
			'sidemenu' => __( 'Side Menu', 'nds-theme' ),
			'footer'   => __( 'Footer', 'nds-theme' ),
		)
	);
}
add_action( 'after_setup_theme', 'nds_register_menus' );
