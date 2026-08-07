(function (wp) {
	'use strict';

	if (!wp || !wp.blocks || !wp.element || !wp.blockEditor) {
		return;
	}

	var el = wp.element.createElement;
	var __ = wp.i18n.__;
	var registerBlockType = wp.blocks.registerBlockType;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var InnerBlocks = wp.blockEditor.InnerBlocks;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var RangeControl = wp.components.RangeControl;
	var ToggleControl = wp.components.ToggleControl;

	registerBlockType('nds/swiper', {
		title: __('NDS Swiper', 'nds-theme'),
		icon: 'images-alt2',
		category: 'design',
		edit: function (props) {
			var blockProps = useBlockProps({ className: 'nds-swiper-editor' });
			var a = props.attributes;

			return el(
				wp.element.Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __('Carousel settings', 'nds-theme') },
						el(RangeControl, { label: __('Slides on desktop', 'nds-theme'), value: a.slidesMax, min: 1, max: 6, onChange: function (v) { props.setAttributes({ slidesMax: v }); } }),
						el(RangeControl, { label: __('Slides on tablet', 'nds-theme'), value: a.slidesMid, min: 1, max: 4, onChange: function (v) { props.setAttributes({ slidesMid: v }); } }),
						el(RangeControl, { label: __('Slides on mobile', 'nds-theme'), value: a.slidesMin, min: 1, max: 3, onChange: function (v) { props.setAttributes({ slidesMin: v }); } }),
						el(RangeControl, { label: __('Peek (px)', 'nds-theme'), value: a.peek, min: 0, max: 120, onChange: function (v) { props.setAttributes({ peek: v }); } }),
						el(ToggleControl, { label: __('Show arrows', 'nds-theme'), checked: a.showArrows, onChange: function (v) { props.setAttributes({ showArrows: v }); } }),
						el(ToggleControl, { label: __('Show pagination', 'nds-theme'), checked: a.showPagination, onChange: function (v) { props.setAttributes({ showPagination: v }); } })
					)
				),
				el(
					'div',
					blockProps,
					el('p', { className: 'nds-block-note' }, __('Each block inside is one slide.', 'nds-theme')),
					el(InnerBlocks, {
						allowedBlocks: ['core/group', 'core/image', 'core/heading', 'core/paragraph', 'core/buttons'],
						template: [
							['core/group', { className: 'is-style-nds-card' }, [
								['core/heading', { level: 3, placeholder: __('Slide title', 'nds-theme') }],
								['core/paragraph', { placeholder: __('Slide description', 'nds-theme') }],
							]],
							['core/group', { className: 'is-style-nds-card' }, [
								['core/heading', { level: 3, placeholder: __('Slide title', 'nds-theme') }],
								['core/paragraph', { placeholder: __('Slide description', 'nds-theme') }],
							]],
						],
					})
				)
			);
		},
		save: function (props) {
			var blockProps = wp.blockEditor.useBlockProps.save({
				className: 'nds-swiper',
				'data-slides-max': props.attributes.slidesMax,
				'data-slides-mid': props.attributes.slidesMid,
				'data-slides-min': props.attributes.slidesMin,
				'data-peek': props.attributes.peek,
				'data-arrows': props.attributes.showArrows ? '1' : '0',
				'data-pagination': props.attributes.showPagination ? '1' : '0',
			});

			return el(
				'div',
				blockProps,
				el('div', { className: 'nds-swiper-wrapper' }, el(InnerBlocks.Content)),
				el(
					'div',
					{ className: 'nds-swiper-navigation' },
					el('div', { className: 'nds-swiper-buttons' },
						el('button', { type: 'button', className: 'nds-btn nds-subtle nds-icon-only nds-swiper-prev', 'aria-label': __('Previous slide', 'nds-theme') }, '\u2039'),
						el('button', { type: 'button', className: 'nds-btn nds-subtle nds-icon-only nds-swiper-next', 'aria-label': __('Next slide', 'nds-theme') }, '\u203A')
					),
					el('div', { className: 'nds-swiper-pagination' })
				)
			);
		},
	});
})(window.wp);
