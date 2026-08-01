/**
 * NDS Component Gallery — client-side search over the rendered grid.
 *
 * Server-rendered first page (SEO-safe); typing filters cards in place
 * without a round trip. Facet filtering can extend the same data-* pattern.
 *
 * @package NDS
 */
(function () {
	'use strict';

	function init(gallery) {
		var input = gallery.querySelector('.nds-gallery-search');
		var grid = gallery.querySelector('[data-nds-gallery-grid]');
		if (!input || !grid) {
			return;
		}

		var items = Array.prototype.slice.call(grid.children);

		input.addEventListener('input', function () {
			var q = input.value.trim().toLowerCase();
			var visible = 0;

			items.forEach(function (item) {
				var hay = (item.getAttribute('data-title') || '') + ' ' + (item.getAttribute('data-terms') || '');
				var show = !q || hay.indexOf(q) !== -1;
				item.hidden = !show;
				if (show) {
					visible++;
				}
			});

			var empty = gallery.querySelector('.nds-gallery-empty');
			if (visible === 0) {
				if (!empty) {
					empty = document.createElement('p');
					empty.className = 'nds-empty-state nds-gallery-empty';
					empty.textContent = window.NDSTheme && window.NDSTheme.labels && window.NDSTheme.labels.noResults
						? window.NDSTheme.labels.noResults
						: 'No items match your search.';
					grid.parentNode.insertBefore(empty, grid.nextSibling);
				}
			} else if (empty) {
				empty.remove();
			}
		});
	}

	function boot() {
		document.querySelectorAll('.nds-gallery').forEach(init);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}
})();
