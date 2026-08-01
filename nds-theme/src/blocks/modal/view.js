/**
 * NDS Modal — front-end behavior.
 *
 * Focus-trapped dialog: open via trigger, close via Escape, backdrop click,
 * or the close button; focus returns to the trigger on close.
 *
 * @package NDS
 */
(function () {
	'use strict';

	var focusableSel = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

	function init(modal) {
		var trigger = modal.querySelector('.nds-modal-trigger');
		var dialog = modal.querySelector('.nds-modal-dialog');
		if (!trigger || !dialog) {
			return;
		}
		var closeBtn = modal.querySelector('.nds-modal-close');
		var lastFocus = null;

		function setOpen(open) {
			dialog.hidden = !open;
			trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
			if (open) {
				lastFocus = document.activeElement;
				modal.setAttribute('data-open', '1');
				var first = dialog.querySelector(focusableSel);
				if (first) {
					first.focus();
				}
			} else {
				modal.removeAttribute('data-open');
				if (lastFocus && lastFocus.focus) {
					lastFocus.focus();
				}
			}
		}

		trigger.addEventListener('click', function () {
			setOpen(dialog.hidden);
		});

		if (closeBtn) {
			closeBtn.addEventListener('click', function () { setOpen(false); });
		}

		modal.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && !dialog.hidden) {
				setOpen(false);
				return;
			}
			if (event.key !== 'Tab' || dialog.hidden) {
				return;
			}
			// Basic focus trap: wrap Tab within the dialog.
			var focusables = Array.prototype.filter.call(dialog.querySelectorAll(focusableSel), function (n) { return n.offsetParent !== null; });
			if (!focusables.length) {
				return;
			}
			var first = focusables[0];
			var last = focusables[focusables.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		});

		modal.addEventListener('click', function (event) {
			if (event.target === dialog && dialog.hidden === false) {
				// Click on the backdrop (dialog fills the screen; clicks outside body hit modal).
				return;
			}
		});

		document.addEventListener('click', function (event) {
			if (modal.getAttribute('data-open') === '1' && !modal.contains(event.target)) {
				setOpen(false);
			}
		});
	}

	function boot() {
		document.querySelectorAll('.nds-modal').forEach(init);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}
})();
