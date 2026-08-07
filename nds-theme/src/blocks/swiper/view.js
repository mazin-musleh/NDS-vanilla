/**
 * NDS Swiper — front-end behavior (scroll-snap first, JS syncs controls).
 *
 * Mirrors the source component: CSS scroll-snap does the sliding; this script
 * wires prev/next buttons, pagination dots, and keyboard navigation, and
 * lazily reveals off-view slides.
 *
 * @package NDS
 */
(function () {
	'use strict';

	function init(swiper) {
		var wrapper = swiper.querySelector('.nds-swiper-wrapper');
		if (!wrapper) {
			return;
		}
		var slides = Array.prototype.slice.call(wrapper.children);
		if (slides.length < 2) {
			return;
		}

		var prev = swiper.querySelector('.nds-swiper-prev');
		var next = swiper.querySelector('.nds-swiper-next');
		var pager = swiper.querySelector('.nds-swiper-pagination');
		var index = 0;
		var total = slides.length;

		var perView = swiper.getAttribute('data-slides-max') || '3';

		function slideWidth() {
			var rect = wrapper.getBoundingClientRect();
			return rect.width / parseInt(perView, 10);
		}

		function go(to) {
			index = Math.max(0, Math.min(to, total - 1));
			var dir = document.documentElement.dir === 'rtl' ? -1 : 1;
			wrapper.scrollTo({ left: dir * index * slideWidth(), behavior: 'smooth' });
			paint();
		}

		function paint() {
			if (pager) {
				Array.prototype.forEach.call(pager.children, function (dot, i) {
					dot.classList.toggle('is-active', i === index);
					dot.setAttribute('aria-current', i === index ? 'true' : 'false');
				});
			}
			slides.forEach(function (slide, i) {
				if (i >= index - 1 && i <= index + 1) {
					slide.querySelectorAll('img[data-src]').forEach(function (img) {
						img.src = img.dataset.src;
						delete img.dataset.src;
					});
				}
			});
		}

		if (prev) {
			prev.addEventListener('click', function () { go(index - 1); });
		}
		if (next) {
			next.addEventListener('click', function () { go(index + 1); });
		}

		wrapper.addEventListener('scroll', function () {
			var dir = document.documentElement.dir === 'rtl' ? -1 : 1;
			index = Math.round(Math.abs(wrapper.scrollLeft) / slideWidth());
			paint();
		}, { passive: true });

		if (pager) {
			Array.prototype.forEach.call(pager.children, function (dot, i) {
				dot.addEventListener('click', function () { go(i); });
			});
			// Render dots (save emits an empty container; JS fills it).
			if (0 === pager.children.length) {
				for (var i = 0; i < total; i++) {
					var dot = document.createElement('button');
					dot.type = 'button';
					dot.className = 'nds-swiper-dot';
					dot.setAttribute('aria-label', 'Slide ' + (i + 1));
					pager.appendChild(dot);
				}
			}
		}

		swiper.addEventListener('keydown', function (event) {
			if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
				var dir = document.documentElement.dir === 'rtl' ? -1 : 1;
				if (event.key === 'ArrowLeft') {
					go(index - dir);
				} else {
					go(index + dir);
				}
			}
		});

		paint();
	}

	function boot() {
		document.querySelectorAll('.nds-swiper:not(.nds-hero)').forEach(init);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}
})();
