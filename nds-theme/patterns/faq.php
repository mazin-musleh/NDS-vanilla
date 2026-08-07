<?php
/**
 * Pattern: NDS FAQ (details accordion).
 *
 * @package NDS
 */

return array(
	'title'      => __( 'NDS FAQ', 'nds-theme' ),
	'categories' => array( 'nds' ),
	'keywords'   => array( 'faq', 'accordion', 'questions', 'nds' ),
	'content'    => '<!-- wp:group {"className":"is-style-nds-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group is-style-nds-section">
	<!-- wp:group {"className":"nds-section-wrapper","layout":{"type":"constrained"}} -->
	<div class="wp-block-group nds-section-wrapper">
		<!-- wp:heading {"level":2,"className":"nds-section-title"} -->
		<h2 class="wp-block-heading nds-section-title">' . esc_html__( 'Frequently Asked Questions', 'nds-theme' ) . '</h2>
		<!-- /wp:heading -->
		<!-- wp:details {"className":"is-style-nds-accordion"} -->
		<details class="wp-block-details is-style-nds-accordion">
			<summary>' . esc_html__( 'Question one?', 'nds-theme' ) . '</summary>
			<!-- wp:paragraph -->
			<p>' . esc_html__( 'A concise answer of two to three sentences.', 'nds-theme' ) . '</p>
			<!-- /wp:paragraph -->
		</details>
		<!-- /wp:details -->
		<!-- wp:details {"className":"is-style-nds-accordion"} -->
		<details class="wp-block-details is-style-nds-accordion">
			<summary>' . esc_html__( 'Question two?', 'nds-theme' ) . '</summary>
			<!-- wp:paragraph -->
			<p>' . esc_html__( 'A concise answer of two to three sentences.', 'nds-theme' ) . '</p>
			<!-- /wp:paragraph -->
		</details>
		<!-- /wp:details -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->',
);
