<?php
/**
 * Pattern: NDS Alert / Notice (warning variant default).
 *
 * @package NDS
 */

return array(
	'title'      => __( 'NDS Alert', 'nds-theme' ),
	'categories' => array( 'nds' ),
	'keywords'   => array( 'alert', 'notice', 'warning', 'nds' ),
	'content'    => '<!-- wp:group {"className":"is-style-nds-alert-warning","layout":{"type":"constrained"}} -->
<div class="wp-block-group is-style-nds-alert-warning">
	<!-- wp:heading {"level":3,"fontSize":"text-md"} -->
	<h3 class="wp-block-heading has-text-md-font-size">' . esc_html__( 'Important', 'nds-theme' ) . '</h3>
	<!-- /wp:heading -->
	<!-- wp:paragraph -->
	<p>' . esc_html__( 'A short, direct notice the visitor must understand before continuing.', 'nds-theme' ) . '</p>
	<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->',
);
