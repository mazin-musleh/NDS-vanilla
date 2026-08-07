<?php
/**
 * WP-CLI commands for NDS content migration.
 *
 *   wp nds import <file.json> [--dry-run]
 *
 * Imports the bundle produced by scripts/export-data.py into the NDS CPTs.
 * Idempotent: an existing post with the same slug is skipped (or updated
 * with --update).
 *
 * @package NDS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
	return;
}

/**
 * NDS WP-CLI command set.
 */
class NDS_CLI {

	/**
	 * Import an NDS JSON bundle into the NDS post types.
	 *
	 * ## OPTIONS
	 *
	 * <file>
	 * : Path to the JSON bundle.
	 *
	 * [--dry-run]
	 * : Validate only; write nothing.
	 *
	 * [--update]
	 * : Update existing posts (matched by slug) instead of skipping them.
	 *
	 * ## EXAMPLES
	 *
	 *     wp nds import assets/data/nds-import.json --dry-run
	 *     wp nds import assets/data/nds-import.json
	 *
	 * @param array $args       Positional args.
	 * @param array $assoc_args Associative args.
	 */
	public function import( $args, $assoc_args ) {
		list( $file ) = $args;
		$dry_run = ! empty( $assoc_args['dry-run'] );
		$update  = ! empty( $assoc_args['update'] );

		if ( ! file_exists( $file ) ) {
			WP_CLI::error( "File not found: {$file}" );
		}

		$bundle = json_decode( file_get_contents( $file ), true );
		if ( ! is_array( $bundle ) ) {
			WP_CLI::error( 'Invalid JSON bundle.' );
		}

		$summary = array();
		foreach ( $bundle as $post_type => $items ) {
			if ( ! post_type_exists( $post_type ) ) {
				WP_CLI::warning( "Skipping unknown post type: {$post_type}" );
				continue;
			}
			$created = 0;
			$updated = 0;
			$skipped = 0;

			foreach ( $items as $item ) {
				$title  = isset( $item['title'] ) ? trim( (string) $item['title'] ) : '';
				if ( '' === $title ) {
					$skipped++;
					continue;
				}
				$slug = sanitize_title( $title );

				$existing = get_page_by_path( $slug, OBJECT, $post_type );
				if ( $existing && ! $update ) {
					$skipped++;
					continue;
				}

				if ( $dry_run ) {
					$created++;
					continue;
				}

				$post_data = array(
					'post_type'    => $post_type,
					'post_status'  => 'publish',
					'post_title'   => $title,
					'post_name'    => $slug,
					'post_excerpt' => isset( $item['excerpt'] ) ? wp_kses_post( (string) $item['excerpt'] ) : '',
					'post_content' => isset( $item['content'] ) ? wp_kses_post( (string) $item['content'] ) : '',
				);

				$post_id = $existing ? wp_update_post( $post_data + array( 'ID' => $existing->ID ) ) : wp_insert_post( $post_data );

				if ( is_wp_error( $post_id ) || ! $post_id ) {
					WP_CLI::warning( "Failed to import: {$title}" );
					continue;
				}

				// Category term.
				if ( ! empty( $item['category'] ) ) {
					$term = term_exists( $item['category'], 'nds_category' );
					if ( ! $term ) {
						$term = wp_insert_term( $item['category'], 'nds_category' );
					}
					if ( ! is_wp_error( $term ) ) {
						wp_set_object_terms( $post_id, (int) $term['term_id'], 'nds_category' );
					}
				}

				// Tag terms.
				if ( ! empty( $item['tags'] ) && is_array( $item['tags'] ) ) {
					wp_set_object_terms( $post_id, array_map( 'sanitize_text_field', $item['tags'] ), 'post_tag' );
				}

				// Meta.
				if ( ! empty( $item['meta'] ) && is_array( $item['meta'] ) ) {
					foreach ( $item['meta'] as $key => $value ) {
						update_post_meta( $post_id, $key, sanitize_text_field( (string) $value ) );
					}
				}

				$existing ? $updated++ : $created++;
			}

			$summary[] = array( 'post_type' => $post_type ) + compact( 'created', 'updated', 'skipped' );
		}

		WP_CLI::success( 'Import complete.' );
		WP_CLI\Utils\format_items( 'table', $summary, array( 'post_type', 'created', 'updated', 'skipped' ) );
	}
}

WP_CLI::add_command( 'nds', 'NDS_CLI' );
