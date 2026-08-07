(function (wp) {
	'use strict';

	if (!wp || !wp.blocks || !wp.element || !wp.blockEditor) {
		return;
	}

	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var __ = wp.i18n.__;
	var registerBlockType = wp.blocks.registerBlockType;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;
	var RangeControl = wp.components.RangeControl;
	var Button = wp.components.Button;
	var MediaUpload = wp.components.MediaUpload;
	var BaseControl = wp.components.BaseControl;

	function emptySlide() {
		return {
			image: '',
			imageAlt: '',
			imageMobile: '',
			overlay: 0.7,
			heading: '',
			description: '',
			buttonText: '',
			buttonUrl: '',
		};
	}

	function mediaButton(label, onSelect, url) {
		return el(
			MediaUpload,
			{
				onSelect: onSelect,
				allowedTypes: ['image'],
				render: function (obj) {
					return el(
						Button,
						{ onClick: obj.open, variant: 'secondary', isSmall: true },
						url ? label + ' (change)' : label
					);
				},
			}
		);
	}

	function slideFields(slide, index, update) {
		var set = function (key) {
			return function (value) {
				update(index, key, value);
			};
		};

		return el(
			PanelBody,
			{ title: __('Slide', 'nds-theme') + ' ' + (index + 1), initialOpen: index === 0 },
			mediaButton(__('Select image', 'nds-theme'), function (media) { set('image')(media.url); set('imageAlt')(media.alt || ''); }, slide.image),
			slide.image ? el('p', { className: 'nds-block-note' }, slide.image.split('/').pop()) : null,
			mediaButton(__('Select mobile image (optional)', 'nds-theme'), function (media) { set('imageMobile')(media.url); }, slide.imageMobile),
			el(TextControl, { label: __('Image alt text', 'nds-theme'), value: slide.imageAlt, onChange: set('imageAlt') }),
			el(RangeControl, { label: __('Overlay opacity', 'nds-theme'), value: slide.overlay, min: 0, max: 1, step: 0.05, onChange: set('overlay') }),
			el(TextControl, { label: __('Heading', 'nds-theme'), value: slide.heading, onChange: set('heading') }),
			el(TextControl, { label: __('Description', 'nds-theme'), value: slide.description, onChange: set('description') }),
			el(TextControl, { label: __('Button text', 'nds-theme'), value: slide.buttonText, onChange: set('buttonText') }),
			el(TextControl, { label: __('Button URL', 'nds-theme'), value: slide.buttonUrl, onChange: set('buttonUrl') })
		);
	}

	registerBlockType('nds/hero-slider', {
		title: __('NDS Hero Slider', 'nds-theme'),
		icon: 'slides',
		category: 'design',
		edit: function (props) {
			var blockProps = useBlockProps({ className: 'nds-hero-slider-editor' });
			var slides = props.attributes.slides || [];

			function update(index, key, value) {
				var next = slides.slice();
				next[index] = Object.assign({}, next[index], (_defineProperty({}, key, value)));
				props.setAttributes({ slides: next });
			}

			function addSlide() {
				props.setAttributes({ slides: slides.concat([emptySlide()]) });
			}

			function removeSlide(index) {
				var next = slides.slice();
				next.splice(index, 1);
				props.setAttributes({ slides: next });
			}

			var slidePanels = slides.map(function (slide, index) {
				return el(
					Fragment,
					{ key: index },
					slideFields(slide, index, update),
					el(Button, { onClick: function () { removeSlide(index); }, variant: 'tertiary', isDestructive: true, isSmall: true }, __('Remove slide', 'nds-theme'))
				);
			});

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __('Slides', 'nds-theme') },
						slidePanels,
						el(Button, { onClick: addSlide, variant: 'primary', isSmall: true }, __('Add slide', 'nds-theme'))
					)
				),
				el(
					'div',
					blockProps,
					el(
						'div',
						{ className: 'nds-hero-slider-placeholder' },
						el('p', null, __('NDS Hero Slider', 'nds-theme')),
						el('p', { className: 'nds-block-note' }, slides.length + ' ' + __('slide(s) configured — configure in the right sidebar.', 'nds-theme'))
					)
				)
			);
		},
		save: function () {
			return null; // Dynamic: rendered by render.php.
		},
	});

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
		} else {
			obj[key] = value;
		}
		return obj;
	}
})(window.wp);
