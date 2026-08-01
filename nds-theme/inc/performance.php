<?php
/**
 * Performance helpers: LCP-friendly image handling and lean defaults.
 * Expanded in later phases (per-block asset loading is handled by block.json).
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Allow the theme to omit loading attributes on the first content image
 * (the hero slide is fetchpriority="high" via the block attributes instead).
 */
function nds_omit_loading_on_hero( $omit, $post_id ) {
	if ( is_front_page() ) {
		return true;
	}
	return $omit;
}
add_filter( 'wp_omit_loading_attr_threshold', 'nds_omit_loading_on_hero', 10, 2 );
