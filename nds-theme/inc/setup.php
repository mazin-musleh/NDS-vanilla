<?php
/**
 * Theme setup: supports, image sizes, editor styles.
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Theme supports.
 */
function nds_setup() {
	load_theme_textdomain( 'nds-theme', NDS_THEME_DIR . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );

	// Block theme features.
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'custom-line-height' );
	add_theme_support( 'custom-spacing' );
	add_theme_support( 'custom-units' );
	add_theme_support( 'link-color' );
	add_theme_support( 'appearance-tools' );

	add_editor_style( 'assets/css/nds-critical.css' );

	// Image sizes matching the NDS card grid (400x200 class thumbnails).
	add_image_size( 'nds-card', 400, 200, true );
	add_image_size( 'nds-hero-mobile', 768, 0, false );
}
add_action( 'after_setup_theme', 'nds_setup' );

/**
 * HTML5 + excerpt support details.
 */
function nds_content_width() {
	$GLOBALS['content_width'] = 1280;
}
add_action( 'after_setup_theme', 'nds_content_width', 0 );
