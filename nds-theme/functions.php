<?php
/**
 * NDS theme bootstrap.
 *
 * This file only loads the modules under /inc. No logic lives here.
 *
 * @package NDS
 * @subpackage Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'NDS_THEME_VERSION', '0.1.0' );
define( 'NDS_THEME_DIR', get_template_directory() );
define( 'NDS_THEME_URI', get_template_directory_uri() );

require NDS_THEME_DIR . '/inc/setup.php';
require NDS_THEME_DIR . '/inc/enqueue.php';
require NDS_THEME_DIR . '/inc/blocks.php';
require NDS_THEME_DIR . '/inc/menus.php';
require NDS_THEME_DIR . '/inc/i18n.php';
require NDS_THEME_DIR . '/inc/content-types.php';
require NDS_THEME_DIR . '/inc/api.php';
require NDS_THEME_DIR . '/inc/redirects.php';
require NDS_THEME_DIR . '/inc/performance.php';
require NDS_THEME_DIR . '/inc/admin.php';
require NDS_THEME_DIR . '/inc/cli.php';

/**
 * Text domain shorthand (kept for pattern files that return arrays).
 */
function nds_theme_td() {
	return 'nds-theme';
}
