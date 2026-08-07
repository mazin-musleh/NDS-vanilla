<?php
/**
 * Pattern: NDS Feature Grid (icon + title + description cards).
 *
 * @package NDS
 */

return array(
	'title'      => __( 'NDS Feature Grid', 'nds-theme' ),
	'categories' => array( 'nds' ),
	'keywords'   => array( 'features', 'grid', 'cards', 'nds' ),
	'content'    => '<!-- wp:group {"className":"is-style-nds-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group is-style-nds-section">
	<!-- wp:group {"className":"nds-section-wrapper","layout":{"type":"constrained"}} -->
	<div class="wp-block-group nds-section-wrapper">
		<!-- wp:group {"className":"nds-section-head","layout":{"type":"constrained"}} -->
		<div class="wp-block-group nds-section-head">
			<!-- wp:heading {"level":2,"className":"nds-section-title"} -->
			<h2 class="wp-block-heading nds-section-title">' . esc_html__( 'Why Choose This', 'nds-theme' ) . '</h2>
			<!-- /wp:heading -->
		</div>
		<!-- /wp:group -->
		<!-- wp:columns -->
		<div class="wp-block-columns">
			<!-- wp:column {"className":"is-style-nds-card"} -->
			<div class="wp-block-column is-style-nds-card">
				<!-- wp:heading {"level":3,"fontSize":"text-lg"} -->
				<h3 class="wp-block-heading has-text-lg-font-size">' . esc_html__( 'Feature One', 'nds-theme' ) . '</h3>
				<!-- /wp:heading -->
				<!-- wp:paragraph -->
				<p>' . esc_html__( 'One-line description of the first capability.', 'nds-theme' ) . '</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:column -->
			<!-- wp:column {"className":"is-style-nds-card"} -->
			<div class="wp-block-column is-style-nds-card">
				<!-- wp:heading {"level":3,"fontSize":"text-lg"} -->
				<h3 class="wp-block-heading has-text-lg-font-size">' . esc_html__( 'Feature Two', 'nds-theme' ) . '</h3>
				<!-- /wp:heading -->
				<!-- wp:paragraph -->
				<p>' . esc_html__( 'One-line description of the second capability.', 'nds-theme' ) . '</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:column -->
			<!-- wp:column {"className":"is-style-nds-card"} -->
			<div class="wp-block-column is-style-nds-card">
				<!-- wp:heading {"level":3,"fontSize":"text-lg"} -->
				<h3 class="wp-block-heading has-text-lg-font-size">' . esc_html__( 'Feature Three', 'nds-theme' ) . '</h3>
				<!-- /wp:heading -->
				<!-- wp:paragraph -->
				<p>' . esc_html__( 'One-line description of the third capability.', 'nds-theme' ) . '</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:column -->
		</div>
		<!-- /wp:columns -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->',
);
