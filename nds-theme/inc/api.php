<?php
/**
 * REST/admin-ajax endpoints for interactive chrome (feedback, later:
 * ratings, consultations). Every route checks a nonce and sanitizes input.
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Persist a page-feedback vote (up/down) as post meta tally.
 */
function nds_ajax_feedback() {
	check_ajax_referer( 'nds_feedback', '_wpnonce' );

	$value   = isset( $_POST['value'] ) ? sanitize_key( wp_unslash( $_POST['value'] ) ) : '';
	$post_id = isset( $_POST['post_id'] ) ? absint( $_POST['post_id'] ) : 0;

	if ( ! in_array( $value, array( 'up', 'down' ), true ) || ! $post_id ) {
		wp_send_json_error( array( 'message' => __( 'Invalid feedback.', 'nds-theme' ) ) );
	}

	$tally = get_post_meta( $post_id, '_nds_feedback', true );
	if ( ! is_array( $tally ) ) {
		$tally = array( 'up' => 0, 'down' => 0 );
	}
	$tally[ $value ] = (int) $tally[ $value ] + 1;
	update_post_meta( $post_id, '_nds_feedback', $tally );

	wp_send_json_success(
		array(
			'message' => __( 'Thanks for your feedback!', 'nds-theme' ),
			'tally'   => $tally,
		)
	);
}
add_action( 'wp_ajax_nds_feedback', 'nds_ajax_feedback' );
add_action( 'wp_ajax_nopriv_nds_feedback', 'nds_ajax_feedback' );

/**
 * Expose the feedback endpoint + nonce to the theme chrome script.
 */
function nds_feedback_script_data() {
	wp_localize_script(
		'nds-theme-chrome',
		'NDSThemeFeedback',
		array(
			'endpoint' => admin_url( 'admin-ajax.php' ),
			'action'   => 'nds_feedback',
			'nonce'    => wp_create_nonce( 'nds_feedback' ),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'nds_feedback_script_data', 20 );
