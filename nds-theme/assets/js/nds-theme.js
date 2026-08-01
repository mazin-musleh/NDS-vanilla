/**
 * NDS theme chrome (Phase 1).
 *
 * Modules:
 *   1. Dark/light theme toggle (+ persistence).
 *   2. DGA digital-stamp panel toggle.
 *   3. Topbar widgets: Hijri/Gregorian date + real-time clock (Intl-based,
 *      no network; the source's API cache is a Phase-2 enhancement).
 *   4. Cookie consent (accept / reject non-essential), persisted.
 *   5. Accessibility panel: font scale, dyslexia font, high contrast,
 *      text spacing — applied as CSS hooks, persisted.
 *   6. User feedback (thumbs up/down) via admin-ajax with nonce.
 *
 * All behavior is delegated and initialized once; nothing ships without a
 * consuming element in the DOM.
 *
 * @package NDS
 */
(function () {
	'use strict';

	var cfg = window.NDSTheme || {
		themeKey: 'nds-theme',
		defaultTheme: 'light',
		labels: {},
	};
	var fb = window.NDSThemeFeedback || null;
	var root = document.documentElement;

	function onReady(fn) {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', fn);
		} else {
			fn();
		}
	}

	/* ── 1. Theme toggle ─────────────────────────────────────────────── */
	function currentTheme() {
		return root.dataset.theme === 'dark' ? 'dark' : 'light';
	}

	function applyTheme(theme) {
		root.dataset.theme = theme;
		root.style.colorScheme = theme;
		try {
			localStorage.setItem(cfg.themeKey, theme);
		} catch (e) { /* private mode: session only */ }
		syncThemeLabels();
	}

	function syncThemeLabels() {
		var theme = currentTheme();
		var label = theme === 'dark' ? (cfg.labels.toggleLight || 'Toggle light mode') : (cfg.labels.toggleDark || 'Toggle dark mode');
		document.querySelectorAll('[data-theme-toggle]').forEach(function (toggle) {
			toggle.setAttribute('aria-label', label);
			var icon = toggle.querySelector('.nds-theme-toggle-icon');
			if (icon) {
				icon.textContent = theme === 'dark' ? '\u25D3' : '\u25D0';
			}
		});
	}

	/* ── 2. Digital stamp panel ──────────────────────────────────────── */
	function initDigitalStamp() {
		var trigger = document.querySelector('.nds-digital-stamp-tab');
		var panel = document.getElementById('nds-digital-stamp');
		if (!trigger || !panel) {
			return;
		}

		function setOpen(open) {
			panel.hidden = !open;
			trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
		}

		trigger.addEventListener('click', function () {
			setOpen(panel.hidden);
		});

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && !panel.hidden) {
				setOpen(false);
				trigger.focus();
			}
		});

		document.addEventListener('click', function (event) {
			if (panel.hidden) {
				return;
			}
			if (!panel.contains(event.target) && !trigger.contains(event.target)) {
				setOpen(false);
			}
		});
	}

	/* ── 3. Topbar widgets: date + clock ─────────────────────────────── */
	function locale() {
		return (root.lang || 'ar').split('-')[0] === 'ar' ? 'ar-SA' : 'en-US';
	}

	function initDateWidget() {
		var el = document.getElementById('nds-date');
		if (!el) {
			return;
		}
		var calendar = el.getAttribute('data-calendar') || 'hijri';
		var fmt = new Intl.DateTimeFormat(
			calendar === 'hijri' ? 'ar-SA-u-ca-islamic-umalqura' : locale(),
			{ day: 'numeric', month: 'long', year: 'numeric' }
		);
		var render = function () {
			el.textContent = fmt.format(new Date());
		};
		render();
		window.setInterval(render, 60000);
	}

	function initClock() {
		var el = document.getElementById('nds-realTimeClock');
		if (!el) {
			return;
		}
		var render = function () {
			el.textContent = new Date().toLocaleTimeString(locale(), {
				hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true,
			});
		};
		render();
		window.setInterval(render, 1000);
	}

	/* ── 4. Cookie consent ───────────────────────────────────────────── */
	var COOKIE_KEY = 'nds-cookies';

	function initCookies() {
		var popup = document.getElementById('nds-cookie-popup');
		if (!popup) {
			return;
		}
		var decided = null;
		try {
			decided = localStorage.getItem(COOKIE_KEY);
		} catch (e) { /* ignore */ }
		if (decided) {
			return;
		}

		popup.hidden = false;

		function decide(value) {
			try {
				localStorage.setItem(COOKIE_KEY, value);
			} catch (e) { /* ignore */ }
			popup.hidden = true;
		}

		var accept = document.getElementById('nds-cookies-accept');
		var reject = document.getElementById('nds-cookies-reject');
		if (accept) {
			accept.addEventListener('click', function () { decide('accepted'); });
		}
		if (reject) {
			reject.addEventListener('click', function () { decide('rejected'); });
		}
	}

	/* ── 5. Accessibility panel ──────────────────────────────────────── */
	var A11Y_KEY = 'nds-a11y';

	function a11yDefaults() {
		return { font: '1', dyslexia: 'off', contrast: 'off', spacing: 'off' };
	}

	function a11yLoad() {
		var prefs = a11yDefaults();
		try {
			var raw = JSON.parse(localStorage.getItem(A11Y_KEY) || 'null');
			if (raw && typeof raw === 'object') {
				prefs = Object.assign(a11yDefaults(), raw);
			}
		} catch (e) { /* ignore */ }
		return prefs;
	}

	function a11yApply(prefs) {
		root.style.setProperty('--nds-user-font-scale', prefs.font);
		root.classList.toggle('nds-dyslexia', prefs.dyslexia === 'on');
		root.classList.toggle('nds-high-contrast', prefs.contrast === 'on');
		root.classList.toggle('nds-text-spacing', prefs.spacing === 'on');
	}

	function a11ySave(prefs) {
		try {
			localStorage.setItem(A11Y_KEY, JSON.stringify(prefs));
		} catch (e) { /* ignore */ }
	}

	function a11ySyncButtons(prefs) {
		document.querySelectorAll('[data-a11y]').forEach(function (btn) {
			var key = btn.getAttribute('data-a11y');
			var val = btn.getAttribute('data-a11y-value');
			var on = key === 'font' ? prefs.font === val : prefs[key] === val;
			btn.setAttribute('aria-pressed', on ? 'true' : 'false');
		});
	}

	function initAccessibility() {
		var fab = document.querySelector('[data-accessibility-toggle]');
		var panel = document.getElementById('nds-accessibility-panel');
		if (!fab || !panel) {
			return;
		}

		var prefs = a11yLoad();
		a11yApply(prefs);
		a11ySyncButtons(prefs);

		function setOpen(open) {
			panel.hidden = !open;
			fab.setAttribute('aria-expanded', open ? 'true' : 'false');
		}

		fab.addEventListener('click', function () { setOpen(panel.hidden); });

		document.addEventListener('click', function (event) {
			var closeBtn = event.target.closest ? event.target.closest('[data-a11y-close]') : null;
			if (closeBtn) {
				setOpen(false);
				fab.focus();
				return;
			}
			var tile = event.target.closest ? event.target.closest('[data-a11y]') : null;
			if (!tile || !panel.contains(tile)) {
				return;
			}
			var key = tile.getAttribute('data-a11y');
			var val = tile.getAttribute('data-a11y-value');
			if (key === 'font') {
				prefs.font = val;
			} else {
				prefs[key] = prefs[key] === 'on' ? 'off' : 'on';
			}
			a11yApply(prefs);
			a11ySave(prefs);
			a11ySyncButtons(prefs);
		});

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && !panel.hidden) {
				setOpen(false);
				fab.focus();
			}
		});
	}

	/* ── 6. User feedback ────────────────────────────────────────────── */
	function initFeedback() {
		var wrap = document.getElementById('nds-user-feedback');
		if (!wrap || !fb || !fb.endpoint) {
			return;
		}

		wrap.addEventListener('click', function (event) {
			var btn = event.target.closest ? event.target.closest('[data-feedback-value]') : null;
			if (!btn) {
				return;
			}
			var value = btn.getAttribute('data-feedback-value');
			var postId = wrap.getAttribute('data-post-id') || '0';

			var body = new URLSearchParams();
			body.set('action', fb.action || 'nds_feedback');
			body.set('value', value);
			body.set('post_id', postId);
			body.set('_wpnonce', fb.nonce || '');

			fetch(fb.endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				body: body.toString(),
				credentials: 'same-origin',
			})
				.then(function (res) { return res.json(); })
				.then(function (data) {
					var message = data && data.success && data.data && data.data.message
						? data.data.message
						: (cfg.labels.feedbackThanks || 'Thanks for your feedback!');
					wrap.innerHTML = '<p class="nds-feedback-thanks">' + message + '</p>';
				})
				.catch(function () {
					btn.setAttribute('aria-pressed', 'true');
				});
		});
	}

	/* ── Boot ────────────────────────────────────────────────────────── */
	onReady(function () {
		applyTheme(currentTheme());
		initDigitalStamp();
		initDateWidget();
		initClock();
		initCookies();
		initAccessibility();
		initFeedback();
	});
})();
