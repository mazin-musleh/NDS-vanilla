<?php
/**
 * Server render: NDS Component Gallery.
 *
 * Renders a searchable, paginated grid of the selected post type. Page 1 is
 * server-rendered (SEO-safe); view.js adds client-side search over the
 * rendered cards (mirrors the source's filter behavior).
 *
 * @package NDS
 * @var array $attributes Block attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$post_type = isset( $attributes['postType'] ) ? sanitize_key( $attributes['postType'] ) : 'nds_component';
$per_page  = isset( $attributes['perPage'] ) ? absint( $attributes['perPage'] ) : 6;
$show_search = isset( $attributes['showSearch'] ) ? (bool) $attributes['showSearch'] : true;
$columns   = isset( $attributes['columns'] ) ? absint( $attributes['columns'] ) : 3;

if ( ! post_type_exists( $post_type ) ) {
	return '<p class="nds-block-note">' . esc_html__( 'Selected content type does not exist.', 'nds-theme' ) . '</p>';
}

$paged = max( 1, get_query_var( 'paged' ) );

$query = new WP_Query(
	array(
		'post_type'      => $post_type,
		'posts_per_page' => $per_page,
		'paged'          => $paged,
		'post_status'    => 'publish',
	)
);

if ( ! $query->have_posts() ) {
	return '<p class="nds-empty-state">' . esc_html__( 'No items found.', 'nds-theme' ) . '</p>';
}

$wrapper_class = 'nds-gallery';
if ( $columns > 1 ) {
	$wrapper_class .= ' nds-gallery-cols-' . $columns;
}
?>
<div class="<?php echo esc_attr( $wrapper_class ); ?>" data-post-type="<?php echo esc_attr( $post_type ); ?>">
	<?php if ( $show_search ) : ?>
	<div class="nds-gallery-toolbar">
		<label class="screen-reader-text" for="nds-gallery-search"><?php echo esc_html__( 'Search items', 'nds-theme' ); ?></label>
		<input type="search" id="nds-gallery-search" class="nds-gallery-search" placeholder="<?php echo esc_attr__( 'Search…', 'nds-theme' ); ?>" autocomplete="off">
	</div>
	<?php endif; ?>

	<div class="nds-gallery-grid" data-nds-gallery-grid>
		<?php
		while ( $query->have_posts() ) :
			$query->the_post();
			$title = get_the_title();
			$excerpt = has_excerpt() ? get_the_excerpt() : wp_trim_words( get_the_content(), 22 );
			$terms = get_the_terms( get_the_ID(), 'nds_category' );
			$term_names = array();
			if ( $terms && ! is_wp_error( $terms ) ) {
				foreach ( $terms as $term ) {
					$term_names[] = $term->name;
				}
			}
			?>
		<article class="nds-gallery-item is-style-nds-card" data-title="<?php echo esc_attr( mb_strtolower( $title ) ); ?>" data-terms="<?php echo esc_attr( mb_strtolower( implode( ' ', $term_names ) ) ); ?>">
			<?php if ( has_post_thumbnail() ) : ?>
				<div class="nds-gallery-item-media"><?php the_post_thumbnail( 'nds-card' ); ?></div>
			<?php endif; ?>
			<div class="nds-gallery-item-body">
				<h3 class="nds-gallery-item-title"><?php echo esc_html( $title ); ?></h3>
				<?php if ( $excerpt ) : ?>
					<p class="nds-gallery-item-desc"><?php echo esc_html( $excerpt ); ?></p>
				<?php endif; ?>
				<?php if ( $term_names ) : ?>
					<div class="nds-gallery-item-tags">
						<?php foreach ( $term_names as $name ) : ?>
							<span class="nds-tag nds-gray nds-sm"><span class="nds-label"><?php echo esc_html( $name ); ?></span></span>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
				<div class="nds-gallery-item-actions">
					<a class="nds-btn nds-primary" href="<?php the_permalink(); ?>">
						<span class="nds-label"><?php echo esc_html__( 'View', 'nds-theme' ); ?></span>
					</a>
				</div>
			</div>
		</article>
		<?php endwhile; ?>
	</div>

	<?php
	$total = $query->max_num_pages;
	if ( $total > 1 ) :
		$paginate = paginate_links(
			array(
				'total'     => $total,
				'current'   => $paged,
				'prev_text' => '&larr;',
				'next_text' => '&rarr;',
				'type'      => 'list',
			)
		);
		?>
		<nav class="nds-gallery-pagination" aria-label="<?php echo esc_attr__( 'Pagination', 'nds-theme' ); ?>">
			<?php echo wp_kses_post( $paginate ); ?>
		</nav>
	<?php endif; ?>
</div>
<?php
wp_reset_postdata();
