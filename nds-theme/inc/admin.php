<?php
/**
 * Admin: permission/approval system (Phase 4).
 *
 * Content workflow for the NDS content types:
 *
 *   draft -> nds-pending-review -> publish
 *                       \-> reject (back to draft)
 *
 * - Authors without the publish capability are forced to the pending-review
 *   status on save.
 * - Reviewers (users with edit_others_<cpt>) approve/reject from the
 *   "NDS Approval Center" admin page.
 * - Every transition is written to the nds_audit_log post type.
 *
 * Roles map (extensible): administrators and editors get review rights via
 * the edit_others_* capabilities; finer role definitions can be layered on
 * the nds_review_* / nds_publish_* capability namespaces.
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const NDS_CPTS = array( 'nds_component', 'nds_service', 'nds_template', 'nds_example', 'nds_faq', 'nds_event' );
const NDS_STATUS = 'nds-pending-review';

/**
 * Register the pending-review status and the audit log post type.
 */
function nds_admin_register_types() {
	register_post_status(
		NDS_STATUS,
		array(
			'label'                     => _x( 'Pending Review', 'post status', 'nds-theme' ),
			'public'                    => false,
			'internal'                  => true,
			'exclude_from_search'       => true,
			'show_in_admin_all_list'    => true,
			'show_in_admin_status_list' => true,
			'label_count'               => _n_noop( 'Pending Review <span class="count">(%s)</span>', 'Pending Review <span class="count">(%s)</span>', 'nds-theme' ),
		)
	);

	register_post_type(
		'nds_audit_log',
		array(
			'labels'          => array(
				'name'          => __( 'Audit Log', 'nds-theme' ),
				'singular_name' => __( 'Audit Entry', 'nds-theme' ),
			),
			'public'          => false,
			'show_ui'         => false,
			'show_in_menu'    => false,
			'show_in_rest'    => false,
			'capability_type' => 'post',
			'capabilities'    => array( 'create_posts' => 'nds_audit_write' ),
			'map_meta_cap'    => true,
			'supports'        => array( 'title', 'editor' ),
		)
	);
}
add_action( 'init', 'nds_admin_register_types' );

/**
 * Capability helpers.
 *
 * @param string $post_type CPT slug.
 * @return bool Whether the user may review content of this type.
 */
function nds_can_review( $post_type ) {
	return current_user_can( 'edit_others_' . $post_type ) || current_user_can( 'manage_options' );
}

/**
 * Whether the user may publish directly (bypass review).
 *
 * @param string $post_type CPT slug.
 * @return bool
 */
function nds_can_publish_direct( $post_type ) {
	return current_user_can( 'publish_' . $post_type ) || current_user_can( 'manage_options' );
}

/**
 * Gate publishing: non-privileged saves go to pending-review.
 *
 * @param array $data    Post data.
 * @param array $postarr Original post array.
 * @return array
 */
function nds_gate_publish( $data, $postarr ) {
	if ( ! in_array( $data['post_type'], NDS_CPTS, true ) ) {
		return $data;
	}
	if ( 'publish' !== $data['post_status'] ) {
		return $data;
	}
	if ( isset( $postarr['ID'] ) && nds_can_review( $data['post_type'] ) ) {
		return $data;
	}
	if ( nds_can_publish_direct( $data['post_type'] ) ) {
		return $data;
	}

	$data['post_status'] = NDS_STATUS;
	return $data;
}
add_filter( 'wp_insert_post_data', 'nds_gate_publish', 10, 2 );

/**
 * Audit-log writer. Administrators may always write.
 *
 * @param string $action    Action performed.
 * @param int    $object_id Content object id.
 * @param string $details   Details.
 * @return int|\WP_Error
 */
function nds_audit_log( $action, $object_id, $details = '' ) {
	$user = wp_get_current_user();
	if ( ! $user->has_cap( 'manage_options' ) && ! current_user_can( 'nds_audit_write' ) ) {
		return new WP_Error( 'nds_audit_denied', __( 'Audit write denied.', 'nds-theme' ) );
	}

	return wp_insert_post(
		array(
			'post_type'    => 'nds_audit_log',
			'post_status'  => 'publish',
			'post_title'   => sprintf( '[%s] %s #%d', $user->user_login, $action, $object_id ),
			'post_content' => wp_kses_post( $details ),
		)
	);
}

/**
 * Admin menu: NDS > Approval Center, NDS > Audit Log.
 */
function nds_admin_menu() {
	add_menu_page(
		__( 'NDS Admin', 'nds-theme' ),
		__( 'NDS Admin', 'nds-theme' ),
		'edit_posts',
		'nds-admin',
		'nds_render_approval_center',
		'dashicons-superhero',
		3
	);

	add_submenu_page(
		'nds-admin',
		__( 'Approval Center', 'nds-theme' ),
		__( 'Approval Center', 'nds-theme' ),
		'edit_posts',
		'nds-admin',
		'nds_render_approval_center'
	);

	add_submenu_page(
		'nds-admin',
		__( 'Audit Log', 'nds-theme' ),
		__( 'Audit Log', 'nds-theme' ),
		'manage_options',
		'nds-audit-log',
		'nds_render_audit_log'
	);
}
add_action( 'admin_menu', 'nds_admin_menu' );

/**
 * Render the Approval Center: pending items with approve/reject actions.
 */
function nds_render_approval_center() {
	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_die( esc_html__( 'Insufficient permissions.', 'nds-theme' ) );
	}

	$query = new WP_Query(
		array(
			'post_type'      => NDS_CPTS,
			'post_status'    => NDS_STATUS,
			'posts_per_page' => 50,
			'orderby'        => 'modified',
			'order'          => 'DESC',
		)
	);

	echo '<div class="wrap"><h1>' . esc_html__( 'NDS Approval Center', 'nds-theme' ) . '</h1>';

	if ( ! $query->have_posts() ) {
		echo '<p>' . esc_html__( 'Nothing pending review.', 'nds-theme' ) . '</p></div>';
		return;
	}

	echo '<table class="widefat striped"><thead><tr>'
		. '<th>' . esc_html__( 'Title', 'nds-theme' ) . '</th>'
		. '<th>' . esc_html__( 'Type', 'nds-theme' ) . '</th>'
		. '<th>' . esc_html__( 'Modified', 'nds-theme' ) . '</th>'
		. '<th>' . esc_html__( 'Author', 'nds-theme' ) . '</th>'
		. '<th>' . esc_html__( 'Actions', 'nds-theme' ) . '</th>'
		. '</tr></thead><tbody>';

	while ( $query->have_posts() ) {
		$query->the_post();
		$id        = get_the_ID();
		$type_obj  = get_post_type_object( get_post_type() );
		$type_name = $type_obj ? $type_obj->labels->singular_name : get_post_type();
		$author    = get_the_author();

		$approve_url = wp_nonce_url(
			admin_url( 'admin-post.php?action=nds_approve&post_id=' . $id ),
			'nds_approve_' . $id
		);
		$reject_url = wp_nonce_url(
			admin_url( 'admin-post.php?action=nds_reject&post_id=' . $id ),
			'nds_reject_' . $id
		);

		echo '<tr>'
			. '<td><a href="' . esc_url( get_edit_post_link( $id ) ) . '">' . esc_html( get_the_title() ) . '</a>'
			. ' <a href="' . esc_url( get_preview_post_link( $id ) ) . '" target="_blank" rel="noopener">' . esc_html__( '(preview)', 'nds-theme' ) . '</a></td>'
			. '<td>' . esc_html( $type_name ) . '</td>'
			. '<td>' . esc_html( get_the_modified_date() ) . '</td>'
			. '<td>' . esc_html( $author ) . '</td>'
			. '<td>'
			. '<a class="button button-primary" href="' . esc_url( $approve_url ) . '">' . esc_html__( 'Approve', 'nds-theme' ) . '</a> '
			. '<a class="button" href="' . esc_url( $reject_url ) . '">' . esc_html__( 'Reject', 'nds-theme' ) . '</a>'
			. '</td></tr>';
	}

	echo '</tbody></table></div>';
	wp_reset_postdata();
}

/**
 * Render the audit log (latest entries).
 */
function nds_render_audit_log() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Insufficient permissions.', 'nds-theme' ) );
	}

	$query = new WP_Query(
		array(
			'post_type'      => 'nds_audit_log',
			'post_status'    => 'publish',
			'posts_per_page' => 100,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);

	echo '<div class="wrap"><h1>' . esc_html__( 'NDS Audit Log', 'nds-theme' ) . '</h1>';

	if ( ! $query->have_posts() ) {
		echo '<p>' . esc_html__( 'No audit entries yet.', 'nds-theme' ) . '</p></div>';
		return;
	}

	echo '<table class="widefat striped"><thead><tr>'
		. '<th>' . esc_html__( 'Event', 'nds-theme' ) . '</th>'
		. '<th>' . esc_html__( 'Details', 'nds-theme' ) . '</th>'
		. '<th>' . esc_html__( 'Date', 'nds-theme' ) . '</th>'
		. '</tr></thead><tbody>';

	while ( $query->have_posts() ) {
		$query->the_post();
		echo '<tr>'
			. '<td>' . esc_html( get_the_title() ) . '</td>'
			. '<td>' . wp_kses_post( get_the_content() ) . '</td>'
			. '<td>' . esc_html( get_the_date() ) . ' ' . esc_html( get_the_time() ) . '</td>'
			. '</tr>';
	}

	echo '</tbody></table></div>';
	wp_reset_postdata();
}

/**
 * Approve action handler (admin-post).
 */
function nds_handle_approve() {
	$post_id = isset( $_GET['post_id'] ) ? absint( $_GET['post_id'] ) : 0;
	check_admin_referer( 'nds_approve_' . $post_id );

	$post = get_post( $post_id );
	if ( ! $post || ! in_array( $post->post_type, NDS_CPTS, true ) ) {
		wp_die( esc_html__( 'Invalid post.', 'nds-theme' ) );
	}
	if ( ! nds_can_review( $post->post_type ) ) {
		wp_die( esc_html__( 'Insufficient permissions.', 'nds-theme' ) );
	}

	wp_update_post(
		array(
			'ID'          => $post_id,
			'post_status' => 'publish',
		)
	);
	nds_audit_log( 'approved', $post_id, sprintf( 'Approved "%s" (%s).', get_the_title( $post_id ), $post->post_type ) );

	wp_safe_redirect( admin_url( 'admin.php?page=nds-admin&nds-notice=approved' ) );
	exit;
}
add_action( 'admin_post_nds_approve', 'nds_handle_approve' );

/**
 * Reject action handler (admin-post).
 */
function nds_handle_reject() {
	$post_id = isset( $_GET['post_id'] ) ? absint( $_GET['post_id'] ) : 0;
	check_admin_referer( 'nds_reject_' . $post_id );

	$post = get_post( $post_id );
	if ( ! $post || ! in_array( $post->post_type, NDS_CPTS, true ) ) {
		wp_die( esc_html__( 'Invalid post.', 'nds-theme' ) );
	}
	if ( ! nds_can_review( $post->post_type ) ) {
		wp_die( esc_html__( 'Insufficient permissions.', 'nds-theme' ) );
	}

	wp_update_post(
		array(
			'ID'          => $post_id,
			'post_status' => 'draft',
		)
	);
	nds_audit_log( 'rejected', $post_id, sprintf( 'Rejected "%s" (%s).', get_the_title( $post_id ), $post->post_type ) );

	wp_safe_redirect( admin_url( 'admin.php?page=nds-admin&nds-notice=rejected' ) );
	exit;
}
add_action( 'admin_post_nds_reject', 'nds_handle_reject' );

/**
 * Admin notices for the approval actions.
 */
function nds_admin_notices() {
	if ( ! isset( $_GET['nds-notice'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return;
	}
	$notice = sanitize_key( wp_unslash( $_GET['nds-notice'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	if ( 'approved' === $notice ) {
		echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__( 'Content approved and published.', 'nds-theme' ) . '</p></div>';
	} elseif ( 'rejected' === $notice ) {
		echo '<div class="notice notice-warning is-dismissible"><p>' . esc_html__( 'Content rejected and moved back to draft.', 'nds-theme' ) . '</p></div>';
	}
}
add_action( 'admin_notices', 'nds_admin_notices' );
