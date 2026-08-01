<?php
/**
 * Pattern: NDS Footer Columns (link columns + social icons).
 *
 * @package NDS
 */

return array(
	'title'      => __( 'NDS Footer Columns', 'nds-theme' ),
	'categories' => array( 'nds' ),
	'keywords'   => array( 'footer', 'links', 'columns', 'nds' ),
	'content'    => '<!-- wp:columns -->
<div class="wp-block-columns">
	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:heading {"level":3,"fontSize":"text-md"} -->
		<h3 class="wp-block-heading has-text-md-font-size">' . esc_html__( 'Main Links', 'nds-theme' ) . '</h3>
		<!-- /wp:heading -->
		<!-- wp:list -->
		<ul class="wp-block-list">
			<li><a href="#">' . esc_html__( 'Home', 'nds-theme' ) . '</a></li>
			<li><a href="#">' . esc_html__( 'Services', 'nds-theme' ) . '</a></li>
			<li><a href="#">' . esc_html__( 'Contact', 'nds-theme' ) . '</a></li>
		</ul>
		<!-- /wp:list -->
	</div>
	<!-- /wp:column -->
	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:heading {"level":3,"fontSize":"text-md"} -->
		<h3 class="wp-block-heading has-text-md-font-size">' . esc_html__( 'Support', 'nds-theme' ) . '</h3>
		<!-- /wp:heading -->
		<!-- wp:list -->
		<ul class="wp-block-list">
			<li><a href="#">' . esc_html__( 'Help Center', 'nds-theme' ) . '</a></li>
			<li><a href="#">' . esc_html__( 'Privacy Policy', 'nds-theme' ) . '</a></li>
			<li><a href="#">' . esc_html__( 'Terms of Use', 'nds-theme' ) . '</a></li>
		</ul>
		<!-- /wp:list -->
	</div>
	<!-- /wp:column -->
	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:heading {"level":3,"fontSize":"text-md"} -->
		<h3 class="wp-block-heading has-text-md-font-size">' . esc_html__( 'Follow Us', 'nds-theme' ) . '</h3>
		<!-- /wp:heading -->
		<!-- wp:paragraph -->
		<p>' . esc_html__( 'Social media links go here.', 'nds-theme' ) . '</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->',
);
