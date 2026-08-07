<?php
/**
 * Pattern: NDS Sub Hero.
 *
 * @package NDS
 */

return array(
	'title'      => __( 'NDS Sub Hero', 'nds-theme' ),
	'categories' => array( 'nds' ),
	'keywords'   => array( 'hero', 'breadcrumb', 'page header', 'nds' ),
	'content'    => '<!-- wp:group {"className":"nds-hero-section nds-sub","layout":{"type":"constrained"}} -->
<div class="wp-block-group nds-hero-section nds-sub">
	<!-- wp:breadcrumbs /-->
	<!-- wp:group {"className":"nds-section-wrapper","layout":{"type":"constrained"}} -->
	<div class="wp-block-group nds-section-wrapper">
		<!-- wp:group {"className":"nds-section-head","layout":{"type":"constrained"}} -->
		<div class="wp-block-group nds-section-head">
			<!-- wp:heading {"level":1,"className":"nds-section-title"} -->
			<h1 class="wp-block-heading nds-section-title">' . esc_html__( 'Page Title', 'nds-theme' ) . '</h1>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"className":"nds-section-description"} -->
			<p class="nds-section-description">' . esc_html__( 'A one-sentence description of what this page does for the visitor.', 'nds-theme' ) . '</p>
			<!-- /wp:paragraph -->
			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"className":"is-style-nds-primary"} -->
				<div class="wp-block-button is-style-nds-primary"><a class="wp-block-button__link wp-element-button">' . esc_html__( 'Primary Action', 'nds-theme' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->',
);
