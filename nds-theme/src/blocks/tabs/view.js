/**
 * NDS Tabs — front-end behavior (ARIA tabs pattern).
 *
 * @package NDS
 */
(function () {
	'use strict';

	function init(tabs) {
		var tabList = tabs.querySelector('.nds-tab-list');
		var panels = Array.prototype.slice.call(tabs.querySelectorAll('.nds-tab-panel'));
		var buttons = Array.prototype.slice.call(tabList ? tabList.children : []);
		if (!buttons.length || !panels.length) {
			return;
		}

		function activate(index) {
			buttons.forEach(function (btn, i) {
				var active = i === index;
				btn.setAttribute('aria-selected', active ? 'true' : 'false');
				btn.tabIndex = active ? 0 : -1;
			});
			panels.forEach(function (panel, i) {
				panel.hidden = i !== index;
			});
		}

		tabList.addEventListener('click', function (event) {
			var target = event.target.closest ? event.target.closest('.nds-tab') : null;
			if (!target) {
				return;
			}
			activate(buttons.indexOf(target));
			target.focus();
		});

		tabList.addEventListener('keydown', function (event) {
			var current = buttons.indexOf(document.activeElement);
			if (current < 0) {
				return;
			}
			var next = current;
			if (event.key === 'ArrowRight') {
				next = (current + 1) % buttons.length;
			} else if (event.key === 'ArrowLeft') {
				next = (current - 1 + buttons.length) % buttons.length;
			} else if (event.key === 'Home') {
				next = 0;
			} else if (event.key === 'End') {
				next = buttons.length - 1;
			} else {
				return;
			}
			event.preventDefault();
			activate(next);
			buttons[next].focus();
		});

		activate(0);
	}

	function boot() {
		document.querySelectorAll('.nds-tabs').forEach(init);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}
})();
