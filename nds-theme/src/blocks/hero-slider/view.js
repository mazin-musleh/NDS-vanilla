/**
 * NDS Hero Slider — front-end behavior.
 *
 * The slides are server-rendered (render.php). This script wires the
 * navigation controls and pagination, mirrors the source's scroll-snap-first
 * approach (JS only syncs controls), and lazy-loads non-first slide images
 * via data-src.
 *
 * @package NDS
 */
(function () {
	'use strict';

	function init(swiper) {
		var slides = Array.prototype.slice.call(swiper.querySelectorAll('.nds-hero-slide'));
		if (slides.length < 2) {
			return; // Single slide: no navigation needed.
		}

		var prev = swiper.querySelector('.nds-swiper-prev');
		var next = swiper.querySelector('.nds-swiper-next');
		var pager = swiper.querySelector('.nds-swiper-pagination');
		var index = 0;
		var total = slides.length;

		function paint() {
			slides.forEach(function (slide, i) {
				var active = i === index;
				slide.hidden = !active;
				if (active && slide.dataset.src) {
					var img = slide.querySelector('img[data-src]');
					if (img) {
						img.src = img.dataset.src;
						delete img.dataset.src;
					}
				}
			});
			if (pager) {
				Array.prototype.forEach.call(pager.children, function (dot, i) {
					dot.classList.toggle('is-active', i === index);
					dot.setAttribute('aria-current', i === index ? 'true' : 'false');
				});
			}
			swiper.setAttribute('data-index', String(index));
		}

		function go(to) {
			index = (to + total) % total;
			paint();
		}

		if (prev) {
			prev.addEventListener('click', function () { go(index - 1); });
		}
		if (next) {
			next.addEventListener('click', function () { go(index + 1); });
		}

		if (pager) {
			Array.prototype.forEach.call(pager.children, function (dot, i) {
				dot.addEventListener('click', function () { go(i); });
			});
		}

		swiper.addEventListener('keydown', function (event) {
			if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
				var dir = document.documentElement.dir === 'rtl' ? -1 : 1;
				if (event.key === 'ArrowLeft') {
					go(index - dir);
				} else {
					go(index + dir);
				}
			} else if (event.key === 'Home') {
				go(0);
			} else if (event.key === 'End') {
				go(total - 1);
			}
		});

		paint();
	}

	function boot() {
		document.querySelectorAll('.nds-hero-slider').forEach(init);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}
})();
