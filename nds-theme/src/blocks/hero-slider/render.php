<?php
/**
 * Server render: NDS Hero Slider.
 *
 * First slide is the LCP element: fetchpriority="high", preloaded image.
 * Later slides ship hidden with data-src (lazy) and are revealed by view.js.
 *
 * @package NDS
 * @var array $attributes Block attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$slides = isset( $attributes['slides'] ) && is_array( $attributes['slides'] ) ? $attributes['slides'] : array();

if ( empty( $slides ) ) {
	return '';
}

$total = count( $slides );
?>
<section class="nds-hero-section nds-hero-slider">
	<div class="nds-swiper nds-hero" data-total="<?php echo esc_attr( (string) $total ); ?>">
		<div class="nds-swiper-wrapper">
			<?php foreach ( $slides as $i => $slide ) : ?>
				<?php
				$image        = isset( $slide['image'] ) ? $slide['image'] : '';
				$image_mobile = isset( $slide['imageMobile'] ) ? $slide['imageMobile'] : '';
				$image_alt    = isset( $slide['imageAlt'] ) ? $slide['imageAlt'] : '';
				$overlay      = isset( $slide['overlay'] ) ? (float) $slide['overlay'] : 0.7;
				$heading      = isset( $slide['heading'] ) ? $slide['heading'] : '';
				$description  = isset( $slide['description'] ) ? $slide['description'] : '';
				$button_text  = isset( $slide['buttonText'] ) ? $slide['buttonText'] : '';
				$button_url   = isset( $slide['buttonUrl'] ) ? $slide['buttonUrl'] : '';
				$first        = 0 === $i;
				?>
			<div class="nds-swiper-slide nds-hero-slide"<?php echo $first ? '' : ' hidden'; ?>>
				<div class="nds-hero-image-wrapper" style="--overlay: <?php echo esc_attr( (string) $overlay ); ?>;">
					<?php if ( $first ) : ?>
						<?php if ( $image_mobile ) : ?>
						<picture>
							<source media="(max-width: 768px)" srcset="<?php echo esc_url( $image_mobile ); ?>">
							<img class="nds-hero-image" src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>" fetchpriority="high" decoding="async">
						</picture>
						<?php else : ?>
						<img class="nds-hero-image" src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>" fetchpriority="high" decoding="async">
						<?php endif; ?>
					<?php else : ?>
						<img class="nds-hero-image" data-src="<?php echo esc_url( $image ); ?>" src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>" loading="lazy" decoding="async">
					<?php endif; ?>
				</div>
				<div class="nds-section-body nds-hero-content">
					<?php if ( $heading ) : ?>
						<h1 class="nds-section-title"><?php echo esc_html( $heading ); ?></h1>
					<?php endif; ?>
					<?php if ( $description ) : ?>
						<p class="nds-section-description"><?php echo esc_html( $description ); ?></p>
					<?php endif; ?>
					<?php if ( $button_text && $button_url ) : ?>
						<div class="nds-section-action">
							<a class="nds-btn nds-primary nds-oncolor nds-lg" href="<?php echo esc_url( $button_url ); ?>">
								<span class="nds-label"><?php echo esc_html( $button_text ); ?></span>
							</a>
						</div>
					<?php endif; ?>
				</div>
			</div>
			<?php endforeach; ?>
		</div>
		<?php if ( $total > 1 ) : ?>
		<div class="nds-swiper-navigation">
			<div class="nds-swiper-buttons">
				<button type="button" class="nds-btn nds-subtle nds-icon-only nds-oncolor nds-swiper-prev" aria-label="<?php echo esc_attr__( 'Previous slide', 'nds-theme' ); ?>">
					<span aria-hidden="true">&#8249;</span>
				</button>
				<button type="button" class="nds-btn nds-subtle nds-icon-only nds-oncolor nds-swiper-next" aria-label="<?php echo esc_attr__( 'Next slide', 'nds-theme' ); ?>">
					<span aria-hidden="true">&#8250;</span>
				</button>
			</div>
			<div class="nds-swiper-pagination" role="tablist" aria-label="<?php echo esc_attr__( 'Slide navigation', 'nds-theme' ); ?>">
				<?php for ( $d = 0; $d < $total; $d++ ) : ?>
					<button type="button" class="nds-swiper-dot" role="tab" aria-label="<?php echo esc_attr( sprintf( /* translators: %d: slide number */ __( 'Go to slide %d', 'nds-theme' ), $d + 1 ) ); ?>"></button>
				<?php endfor; ?>
			</div>
		</div>
		<?php endif; ?>
	</div>
</section>
