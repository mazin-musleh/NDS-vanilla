<?php
/**
 * Pattern: NDS Quote.
 *
 * @package NDS
 */

return array(
	'title'      => __( 'NDS Quote', 'nds-theme' ),
	'categories' => array( 'nds' ),
	'keywords'   => array( 'quote', 'statement', 'testimonial', 'nds' ),
	'content'    => '<!-- wp:quote {"className":"is-style-nds-quote"} -->
<blockquote class="wp-block-quote is-style-nds-quote">
	<!-- wp:paragraph -->
	<p>' . esc_html__( 'A genuine, attributed statement of 2–3 sentences.', 'nds-theme' ) . '</p>
	<!-- /wp:paragraph -->
	<cite>' . esc_html__( 'Attribution', 'nds-theme' ) . '</cite>
</blockquote>
<!-- /wp:quote -->',
);
