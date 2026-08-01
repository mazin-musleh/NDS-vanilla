<?php
/**
 * Block styles, pattern category, and pattern registration.
 *
 * Block styles map the NDS component language onto core blocks. Patterns are
 * file-based: every PHP file in /patterns returns a pattern array.
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the NDS pattern category.
 */
function nds_register_pattern_category() {
	register_block_pattern_category(
		'nds',
		array( 'label' => __( 'NDS', 'nds-theme' ) )
	);
}
add_action( 'init', 'nds_register_pattern_category' );

/**
 * Register block styles (NDS component variants on core blocks).
 */
function nds_register_block_styles() {
	$styles = array(
		'core/group' => array(
			array( 'name' => 'nds-section', 'label' => __( 'NDS Section', 'nds-theme' ) ),
			array( 'name' => 'nds-section-primary', 'label' => __( 'NDS Section: Primary', 'nds-theme' ) ),
			array( 'name' => 'nds-section-gradient', 'label' => __( 'NDS Section: Gradient', 'nds-theme' ) ),
			array( 'name' => 'nds-section-brand', 'label' => __( 'NDS Section: Brand tint', 'nds-theme' ) ),
			array( 'name' => 'nds-card', 'label' => __( 'NDS Card', 'nds-theme' ) ),
			array( 'name' => 'nds-alert', 'label' => __( 'NDS Alert', 'nds-theme' ) ),
			array( 'name' => 'nds-alert-info', 'label' => __( 'NDS Alert: Info', 'nds-theme' ) ),
			array( 'name' => 'nds-alert-success', 'label' => __( 'NDS Alert: Success', 'nds-theme' ) ),
			array( 'name' => 'nds-alert-warning', 'label' => __( 'NDS Alert: Warning', 'nds-theme' ) ),
			array( 'name' => 'nds-alert-error', 'label' => __( 'NDS Alert: Error', 'nds-theme' ) ),
			array( 'name' => 'nds-sideinfo', 'label' => __( 'NDS Side Info', 'nds-theme' ) ),
			array( 'name' => 'nds-block', 'label' => __( 'NDS Block', 'nds-theme' ) ),
		),
		'core/heading' => array(
			array( 'name' => 'nds-section-title', 'label' => __( 'NDS Section Title', 'nds-theme' ) ),
		),
		'core/paragraph' => array(
			array( 'name' => 'nds-section-description', 'label' => __( 'NDS Section Description', 'nds-theme' ) ),
			array( 'name' => 'nds-lead', 'label' => __( 'NDS Lead (brief)', 'nds-theme' ) ),
		),
		'core/button' => array(
			array( 'name' => 'nds-primary', 'label' => __( 'NDS Primary', 'nds-theme' ) ),
			array( 'name' => 'nds-secondary', 'label' => __( 'NDS Secondary', 'nds-theme' ) ),
			array( 'name' => 'nds-secondary-outline', 'label' => __( 'NDS Secondary Outline', 'nds-theme' ) ),
			array( 'name' => 'nds-subtle', 'label' => __( 'NDS Subtle', 'nds-theme' ) ),
			array( 'name' => 'nds-danger', 'label' => __( 'NDS Danger', 'nds-theme' ) ),
			array( 'name' => 'nds-oncolor', 'label' => __( 'NDS On Color', 'nds-theme' ) ),
		),
		'core/details' => array(
			array( 'name' => 'nds-accordion', 'label' => __( 'NDS Accordion', 'nds-theme' ) ),
		),
		'core/quote' => array(
			array( 'name' => 'nds-quote', 'label' => __( 'NDS Quote', 'nds-theme' ) ),
		),
		'core/table' => array(
			array( 'name' => 'nds-table', 'label' => __( 'NDS Table', 'nds-theme' ) ),
			array( 'name' => 'nds-table-responsive', 'label' => __( 'NDS Table: Responsive', 'nds-theme' ) ),
		),
		'core/separator' => array(
			array( 'name' => 'nds-divider', 'label' => __( 'NDS Divider', 'nds-theme' ) ),
			array( 'name' => 'nds-divider-lg', 'label' => __( 'NDS Divider: Large', 'nds-theme' ) ),
		),
		'core/tag-cloud' => array(
			array( 'name' => 'nds-tags', 'label' => __( 'NDS Tags', 'nds-theme' ) ),
		),
	);

	foreach ( $styles as $block => $variations ) {
		foreach ( $variations as $variation ) {
			register_block_style( $block, $variation );
		}
	}
}
add_action( 'init', 'nds_register_block_styles' );

/**
 * Register file-based patterns (each file returns a pattern array).
 */
function nds_register_patterns() {
	$files = glob( NDS_THEME_DIR . '/patterns/*.php' );
	if ( ! $files ) {
		return;
	}

	foreach ( $files as $file ) {
		$slug = 'nds/' . basename( $file, '.php' );
		$pattern = include $file;
		if ( is_array( $pattern ) && ! empty( $pattern['content'] ) ) {
			register_block_pattern( $slug, $pattern );
		}
	}
}
add_action( 'init', 'nds_register_patterns' );

/**
 * Register custom blocks from /src/blocks/* (each directory has a block.json).
 */
function nds_register_custom_blocks() {
	$dirs = glob( NDS_THEME_DIR . '/src/blocks/*', GLOB_ONLYDIR );
	if ( ! $dirs ) {
		return;
	}

	foreach ( $dirs as $dir ) {
		if ( file_exists( $dir . '/block.json' ) ) {
			register_block_type( $dir );
		}
	}
}
add_action( 'init', 'nds_register_custom_blocks' );
