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
	var TextControl = wp.components.TextControl;

	registerBlockType('nds/tab', {
		title: __('NDS Tab', 'nds-theme'),
		icon: 'table-row-after',
		category: 'design',
		edit: function (props) {
			var blockProps = useBlockProps({ className: 'nds-tab-editor' });

			return el(
				wp.element.Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __('Tab settings', 'nds-theme') },
						el(TextControl, {
							label: __('Tab title', 'nds-theme'),
							value: props.attributes.title,
							onChange: function (v) { props.setAttributes({ title: v }); },
						})
					)
				),
				el(
					'div',
					blockProps,
					el('p', { className: 'nds-block-note' }, __('Panel: ', 'nds-theme') + props.attributes.title),
					el(InnerBlocks, { template: [['core/paragraph', { placeholder: __('Panel content', 'nds-theme') }]] })
				)
			);
		},
		save: function (props) {
			var blockProps = wp.blockEditor.useBlockProps.save({
				className: 'nds-tab-panel',
				role: 'tabpanel',
			});
			return el('div', blockProps, el(InnerBlocks.Content));
		},
	});
})(window.wp);
