<?php
/**
 * Content types: CPTs and taxonomies that back the NDS directory pages
 * (components, templates, examples, services, FAQs) plus versioning meta.
 *
 * Registered now (Phase 0) so the data model exists; the gallery block and
 * templates consume them in Phase 2/3.
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register CPTs and taxonomies.
 */
function nds_register_content_types() {

	register_post_type(
		'nds_component',
		array(
			'labels'       => array(
				'name'          => __( 'Components', 'nds-theme' ),
				'singular_name' => __( 'Component', 'nds-theme' ),
				'menu_name'     => __( 'NDS Components', 'nds-theme' ),
			),
			'public'       => true,
			'has_archive'  => true,
			'menu_icon'    => 'dashicons-layout',
			'show_in_rest' => true,
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
			'rewrite'      => array( 'slug' => 'components' ),
		)
	);

	register_post_type(
		'nds_service',
		array(
			'labels'       => array(
				'name'          => __( 'Services', 'nds-theme' ),
				'singular_name' => __( 'Service', 'nds-theme' ),
				'menu_name'     => __( 'NDS Services', 'nds-theme' ),
			),
			'public'       => true,
			'has_archive'  => true,
			'menu_icon'    => 'dashicons-admin-generic',
			'show_in_rest' => true,
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
			'rewrite'      => array( 'slug' => 'services' ),
		)
	);

	register_taxonomy(
		'nds_category',
		array( 'nds_component', 'nds_service' ),
		array(
			'labels'       => array(
				'name'          => __( 'NDS Categories', 'nds-theme' ),
				'singular_name' => __( 'NDS Category', 'nds-theme' ),
			),
			'public'       => true,
			'hierarchical' => true,
			'show_in_rest' => true,
			'rewrite'      => array( 'slug' => 'nds-category' ),
		)
	);

	// Directory + content CPTs consumed by templates and the gallery block.
	$cpts = array(
		'nds_template' => array(
			'labels'    => array(
				'name'          => __( 'Templates', 'nds-theme' ),
				'singular_name' => __( 'Template', 'nds-theme' ),
				'menu_name'     => __( 'NDS Templates', 'nds-theme' ),
			),
			'menu_icon' => 'dashicons-layout',
			'rewrite'   => array( 'slug' => 'templates' ),
		),
		'nds_example'  => array(
			'labels'    => array(
				'name'          => __( 'Examples', 'nds-theme' ),
				'singular_name' => __( 'Example', 'nds-theme' ),
				'menu_name'     => __( 'NDS Examples', 'nds-theme' ),
			),
			'menu_icon' => 'dashicons-portfolio',
			'rewrite'   => array( 'slug' => 'examples' ),
		),
		'nds_faq'      => array(
			'labels'    => array(
				'name'          => __( 'FAQs', 'nds-theme' ),
				'singular_name' => __( 'FAQ', 'nds-theme' ),
				'menu_name'     => __( 'NDS FAQs', 'nds-theme' ),
			),
			'menu_icon' => 'dashicons-editor-help',
			'rewrite'   => array( 'slug' => 'faqs' ),
			'supports'  => array( 'title', 'editor' ),
		),
		'nds_event'    => array(
			'labels'    => array(
				'name'          => __( 'Events', 'nds-theme' ),
				'singular_name' => __( 'Event', 'nds-theme' ),
				'menu_name'     => __( 'NDS Events', 'nds-theme' ),
			),
			'menu_icon' => 'dashicons-calendar-alt',
			'rewrite'   => array( 'slug' => 'events' ),
		),
	);

	foreach ( $cpts as $slug => $args ) {
		$defaults = array(
			'labels'       => array(
				'name'          => $slug,
				'singular_name' => $slug,
			),
			'public'       => true,
			'has_archive'  => true,
			'menu_icon'    => 'dashicons-admin-post',
			'show_in_rest' => true,
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
			'rewrite'      => array( 'slug' => $slug ),
		);
		register_post_type( $slug, array_replace_recursive( $defaults, $args ) );
	}
}
add_action( 'init', 'nds_register_content_types' );

/**
 * Versioning meta (mirrors the source docs' since/updated/last_edit discipline).
 */
function nds_register_meta() {
	$fields = array(
		'_nds_since'     => array( 'type' => 'string', 'description' => __( 'Version the content first shipped.', 'nds-theme' ) ),
		'_nds_updated'   => array( 'type' => 'string', 'description' => __( 'Version of the most recent change.', 'nds-theme' ) ),
		'_nds_last_edit' => array( 'type' => 'string', 'description' => __( 'Timestamp of the most recent edit (GMT+3).', 'nds-theme' ) ),
	);

	foreach ( $fields as $key => $args ) {
		register_post_meta(
			'',
			$key,
			array(
				'type'              => $args['type'],
				'description'       => $args['description'],
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
}
add_action( 'init', 'nds_register_meta' );
