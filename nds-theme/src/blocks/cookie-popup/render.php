<?php
/**
 * Server render: NDS Cookie Popup.
 *
 * @package NDS
 * @var array $attributes Block attributes (unused).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="nds-cookie-popup" id="nds-cookie-popup" role="dialog" aria-live="polite" hidden>
	<p class="nds-cookie-title"><?php echo esc_html__( 'Cookies', 'nds-theme' ); ?></p>
	<p class="nds-cookie-text"><?php echo esc_html__( 'This website uses cookies to ensure ease of use and provide an enhanced browsing experience. By continuing to browse this site, you acknowledge and accept the use of cookies.', 'nds-theme' ); ?></p>
	<div class="nds-cookie-actions">
		<button type="button" class="nds-btn nds-primary" id="nds-cookies-accept"><?php echo esc_html__( 'Accept', 'nds-theme' ); ?></button>
		<button type="button" class="nds-btn nds-secondary" id="nds-cookies-reject"><?php echo esc_html__( 'Reject Non-Essential', 'nds-theme' ); ?></button>
	</div>
</div>
