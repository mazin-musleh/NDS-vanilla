<?php
/**
 * i18n helpers.
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the theme textdomain (also loaded in setup.php; kept here for
 * explicitness and for wp_set_script_translations wiring).
 */
function nds_i18n_init() {
	load_theme_textdomain( 'nds-theme', NDS_THEME_DIR . '/languages' );
}
add_action( 'after_setup_theme', 'nds_i18n_init' );
