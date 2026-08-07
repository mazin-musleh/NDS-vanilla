<?php
/**
 * Asset loading: critical CSS shell, theme chrome JS, font preloads,
 * pre-paint theme guard.
 *
 * Performance contract (source parity): the critical stylesheet is small and
 * loads render-blocking; the chrome script is deferred; fonts preload only the
 * two faces the first paint needs; nothing else ships on pages that don't use it.
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register and enqueue the theme's assets.
 */
function nds_enqueue_assets() {
	$version = defined( 'WP_DEBUG' ) && WP_DEBUG ? filemtime( NDS_THEME_DIR . '/assets/css/nds-critical.css' ) : NDS_THEME_VERSION;

	wp_enqueue_style(
		'nds-critical',
		NDS_THEME_URI . '/assets/css/nds-critical.css',
		array(),
		$version
	);

	wp_enqueue_script(
		'nds-theme-chrome',
		NDS_THEME_URI . '/assets/js/nds-theme.js',
		array(),
		NDS_THEME_VERSION,
		array(
			'in_footer' => true,
			'strategy'  => 'defer',
		)
	);

	wp_localize_script(
		'nds-theme-chrome',
		'NDSTheme',
		array(
			'themeKey'       => 'nds-theme',
			'defaultTheme'   => 'light',
			'labels'         => array(
				'toggleDark'     => esc_html__( 'Toggle dark mode', 'nds-theme' ),
				'toggleLight'    => esc_html__( 'Toggle light mode', 'nds-theme' ),
				'feedbackThanks' => esc_html__( 'Thanks for your feedback!', 'nds-theme' ),
				'noResults'      => esc_html__( 'No items match your search.', 'nds-theme' ),
			),
			'settings'       => array(
				'dateWidget'     => '1', // Date/clock widget wiring lands in Phase 1.
				'weatherEnabled' => false,
			),
		)
	);

	wp_set_script_translations( 'nds-theme-chrome', 'nds-theme', NDS_THEME_DIR . '/languages' );
}
add_action( 'wp_enqueue_scripts', 'nds_enqueue_assets' );

/**
 * Preload the two critical font faces (Arabic + Latin Regular and Bold) so
 * the first paint does not wait on the font swap. Static URLs only.
 */
function nds_preload_fonts() {
	$fonts = array(
		NDS_THEME_URI . '/assets/fonts/IBMPlexSansArabic-Regular.woff2',
		NDS_THEME_URI . '/assets/fonts/IBMPlexSansArabic-Bold.woff2',
		NDS_THEME_URI . '/assets/fonts/IBMPlexSans-Regular-Latin1.woff2',
		NDS_THEME_URI . '/assets/fonts/IBMPlexSans-Bold-Latin1.woff2',
	);

	foreach ( $fonts as $font ) {
		printf(
			'<link rel="preload" as="font" type="font/woff2" href="%s" crossorigin />' . "\n",
			esc_url( $font )
		);
	}
}
add_action( 'wp_head', 'nds_preload_fonts', 2 );

/**
 * Pre-paint theme guard: applies the saved theme before first paint so there
 * is no light-to-dark flash. Static content only (no user data).
 */
function nds_pre_paint_theme_guard() {
	?>
<script>
(function () {
	try {
		var v = localStorage.getItem('nds-theme');
		if (v === 'dark' || v === 'light') {
			document.documentElement.dataset.theme = v;
			document.documentElement.style.colorScheme = v;
		}
	} catch (e) {}
})();
</script>
	<?php
}
add_action( 'wp_head', 'nds_pre_paint_theme_guard', 1 );
