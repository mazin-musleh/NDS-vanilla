<?php
/**
 * Server render: NDS User Feedback (singular content only).
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! is_singular() ) {
	return '';
}

$post_id = get_the_ID();
?>
<div class="nds-user-feedback" id="nds-user-feedback" data-post-id="<?php echo esc_attr( (string) $post_id ); ?>" role="group" aria-label="<?php echo esc_attr__( 'Page feedback', 'nds-theme' ); ?>">
	<p class="nds-feedback-question"><?php echo esc_html__( 'Was this page helpful?', 'nds-theme' ); ?></p>
	<div class="nds-feedback-actions">
		<button type="button" class="nds-btn nds-subtle" data-feedback-value="up" aria-pressed="false"><?php echo esc_html__( 'Yes', 'nds-theme' ); ?></button>
		<button type="button" class="nds-btn nds-subtle" data-feedback-value="down" aria-pressed="false"><?php echo esc_html__( 'No', 'nds-theme' ); ?></button>
	</div>
</div>
