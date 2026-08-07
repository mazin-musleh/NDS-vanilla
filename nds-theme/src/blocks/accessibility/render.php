<?php
/**
 * Server render: NDS Accessibility Panel (FAB + presets).
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<button type="button" class="nds-btn nds-primary nds-circle nds-fab nds-accessibility-toggle" data-accessibility-toggle aria-expanded="false" aria-controls="nds-accessibility-panel">
	<span aria-hidden="true">Aa</span>
	<span class="screen-reader-text"><?php echo esc_html__( 'Accessibility settings', 'nds-theme' ); ?></span>
</button>

<aside class="nds-a11y-panel" id="nds-accessibility-panel" aria-label="<?php echo esc_attr__( 'Accessibility settings', 'nds-theme' ); ?>" hidden>
	<div class="nds-a11y-panel-head">
		<h2 class="nds-a11y-panel-title"><?php echo esc_html__( 'Accessibility', 'nds-theme' ); ?></h2>
		<button type="button" class="nds-btn nds-subtle nds-icon-only nds-a11y-close" data-a11y-close aria-label="<?php echo esc_attr__( 'Close accessibility settings', 'nds-theme' ); ?>">
			<span aria-hidden="true">×</span>
		</button>
	</div>

	<div class="nds-a11y-tile">
		<span class="nds-a11y-tile-label"><?php echo esc_html__( 'Font size', 'nds-theme' ); ?></span>
		<div class="nds-a11y-tile-row">
			<button type="button" class="nds-btn nds-subtle nds-a11y-option" data-a11y="font" data-a11y-value="0.9">A</button>
			<button type="button" class="nds-btn nds-subtle nds-a11y-option" data-a11y="font" data-a11y-value="1" data-a11y-default aria-pressed="true">A+</button>
			<button type="button" class="nds-btn nds-subtle nds-a11y-option" data-a11y="font" data-a11y-value="1.2">A++</button>
			<button type="button" class="nds-btn nds-subtle nds-a11y-option" data-a11y="font" data-a11y-value="1.4">A+++</button>
		</div>
	</div>

	<div class="nds-a11y-tile">
		<span class="nds-a11y-tile-label"><?php echo esc_html__( 'Dyslexia font', 'nds-theme' ); ?></span>
		<button type="button" class="nds-btn nds-subtle nds-a11y-option" data-a11y="dyslexia" data-a11y-value="on" aria-pressed="false"><?php echo esc_html__( 'Enable', 'nds-theme' ); ?></button>
	</div>

	<div class="nds-a11y-tile">
		<span class="nds-a11y-tile-label"><?php echo esc_html__( 'High contrast', 'nds-theme' ); ?></span>
		<button type="button" class="nds-btn nds-subtle nds-a11y-option" data-a11y="contrast" data-a11y-value="on" aria-pressed="false"><?php echo esc_html__( 'Enable', 'nds-theme' ); ?></button>
	</div>

	<div class="nds-a11y-tile">
		<span class="nds-a11y-tile-label"><?php echo esc_html__( 'Text spacing', 'nds-theme' ); ?></span>
		<button type="button" class="nds-btn nds-subtle nds-a11y-option" data-a11y="spacing" data-a11y-value="on" aria-pressed="false"><?php echo esc_html__( 'Enable', 'nds-theme' ); ?></button>
	</div>
</aside>
