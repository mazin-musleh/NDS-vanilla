<?php
/**
 * Pattern: NDS Section Head.
 *
 * @package NDS
 */

return array(
	'title'      => __( 'NDS Section Head', 'nds-theme' ),
	'categories' => array( 'nds' ),
	'keywords'   => array( 'section', 'heading', 'description', 'nds' ),
	'content'    => '<!-- wp:group {"className":"is-style-nds-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group is-style-nds-section">
	<!-- wp:group {"className":"nds-section-wrapper","layout":{"type":"constrained"}} -->
	<div class="wp-block-group nds-section-wrapper">
		<!-- wp:group {"className":"nds-section-head","layout":{"type":"constrained"}} -->
		<div class="wp-block-group nds-section-head">
			<!-- wp:heading {"level":2,"className":"nds-section-title"} -->
			<h2 class="wp-block-heading nds-section-title">' . esc_html__( 'Section Title', 'nds-theme' ) . '</h2>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"className":"nds-section-description"} -->
			<p class="nds-section-description">' . esc_html__( 'Why this section matters and what it covers.', 'nds-theme' ) . '</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
		<!-- wp:paragraph -->
		<p>' . esc_html__( 'Section body content.', 'nds-theme' ) . '</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->',
);
