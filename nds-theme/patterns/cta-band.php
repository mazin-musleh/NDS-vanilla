<?php
/**
 * Pattern: NDS CTA Band (deep brand surface + actions).
 *
 * @package NDS
 */

return array(
	'title'      => __( 'NDS CTA Band', 'nds-theme' ),
	'categories' => array( 'nds' ),
	'keywords'   => array( 'cta', 'call to action', 'get started', 'nds' ),
	'content'    => '<!-- wp:group {"className":"is-style-nds-section-primary","layout":{"type":"constrained"}} -->
<div class="wp-block-group is-style-nds-section-primary">
	<!-- wp:group {"className":"nds-section-wrapper","layout":{"type":"constrained"}} -->
	<div class="wp-block-group nds-section-wrapper">
		<!-- wp:group {"className":"nds-section-head","layout":{"type":"constrained"}} -->
		<div class="wp-block-group nds-section-head">
			<!-- wp:heading {"level":2,"className":"nds-section-title"} -->
			<h2 class="wp-block-heading nds-section-title">' . esc_html__( 'Get Started', 'nds-theme' ) . '</h2>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"className":"nds-section-description"} -->
			<p class="nds-section-description">' . esc_html__( 'A closing invitation with one clear next step.', 'nds-theme' ) . '</p>
			<!-- /wp:paragraph -->
			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"className":"is-style-nds-oncolor"} -->
				<div class="wp-block-button is-style-nds-oncolor"><a class="wp-block-button__link wp-element-button">' . esc_html__( 'Start Now', 'nds-theme' ) . '</a></div>
				<!-- /wp:button -->
				<!-- wp:button {"className":"is-style-nds-secondary-outline"} -->
				<div class="wp-block-button is-style-nds-secondary-outline"><a class="wp-block-button__link wp-element-button">' . esc_html__( 'Learn More', 'nds-theme' ) . '</a></div>
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
