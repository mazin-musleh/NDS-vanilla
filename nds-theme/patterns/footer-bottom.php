<?php
/**
 * Pattern: NDS Footer Bottom (copyright + policy links).
 *
 * @package NDS
 */

return array(
	'title'      => __( 'NDS Footer Bottom', 'nds-theme' ),
	'categories' => array( 'nds' ),
	'keywords'   => array( 'footer', 'copyright', 'legal', 'nds' ),
	'content'    => '<!-- wp:group {"className":"nds-footer-bottom","layout":{"type":"flex","justifyContent":"space-between","flexWrap":"wrap"}} -->
<div class="wp-block-group nds-footer-bottom">
	<!-- wp:paragraph {"className":"nds-footer-copyright"} -->
	<p class="nds-footer-copyright">' . esc_html__( 'All Rights Reserved', 'nds-theme' ) . ' © ' . esc_html( gmdate( 'Y' ) ) . '</p>
	<!-- /wp:paragraph -->
	<!-- wp:paragraph {"className":"nds-footer-policy"} -->
	<p class="nds-footer-policy"><a href="#">' . esc_html__( 'Privacy Policy', 'nds-theme' ) . '</a> · <a href="#">' . esc_html__( 'Terms and Conditions', 'nds-theme' ) . '</a> · <a href="#">' . esc_html__( 'Accessibility', 'nds-theme' ) . '</a></p>
	<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->',
);
