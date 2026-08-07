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
	var SelectControl = wp.components.SelectControl;

	registerBlockType('nds/modal', {
		title: __('NDS Modal', 'nds-theme'),
		icon: 'external',
		category: 'design',
		edit: function (props) {
			var blockProps = useBlockProps({ className: 'nds-modal-editor' });
			var a = props.attributes;

			return el(
				wp.element.Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __('Modal settings', 'nds-theme') },
						el(TextControl, { label: __('Trigger text', 'nds-theme'), value: a.triggerText, onChange: function (v) { props.setAttributes({ triggerText: v }); } }),
						el(SelectControl, {
							label: __('Trigger style', 'nds-theme'),
							value: a.triggerStyle,
							options: [
								{ label: __('Primary', 'nds-theme'), value: 'is-style-nds-primary' },
								{ label: __('Secondary', 'nds-theme'), value: 'is-style-nds-secondary' },
								{ label: __('Secondary outline', 'nds-theme'), value: 'is-style-nds-secondary-outline' },
								{ label: __('Subtle', 'nds-theme'), value: 'is-style-nds-subtle' },
							],
							onChange: function (v) { props.setAttributes({ triggerStyle: v }); },
						}),
						el(TextControl, { label: __('Dialog title', 'nds-theme'), value: a.modalTitle, onChange: function (v) { props.setAttributes({ modalTitle: v }); } })
					)
				),
				el(
					'div',
					blockProps,
					el(
						'div',
						{ className: 'nds-modal-preview-trigger' },
						el('span', { className: 'nds-block-note' }, a.triggerText + ' — ' + __('opens the dialog below', 'nds-theme'))
					),
					el(
						'div',
						{ className: 'nds-modal-editor-body' },
						el('p', { className: 'nds-block-note' }, __('Modal body: ', 'nds-theme') + a.modalTitle),
						el(InnerBlocks, { template: [['core/paragraph', { placeholder: __('Modal content', 'nds-theme') }]] })
					)
				)
			);
		},
		save: function (props) {
			var blockProps = wp.blockEditor.useBlockProps.save({ className: 'nds-modal' });
			var a = props.attributes;

			return el(
				'div',
				blockProps,
				el(
					'button',
					{
						type: 'button',
						className: 'nds-btn ' + a.triggerStyle + ' nds-modal-trigger',
						'aria-expanded': 'false',
						'aria-controls': 'nds-modal-dialog',
					},
					a.triggerText
				),
				el(
					'div',
					{ className: 'nds-modal-dialog', id: 'nds-modal-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'nds-modal-title', hidden: true },
					el('div', { className: 'nds-modal-head' },
						el('h3', { id: 'nds-modal-title', className: 'nds-modal-title' }, a.modalTitle),
						el('button', { type: 'button', className: 'nds-btn nds-subtle nds-modal-close', 'aria-label': __('Close dialog', 'nds-theme') }, '\u00D7')
					),
					el('div', { className: 'nds-modal-body' }, el(InnerBlocks.Content))
				)
			);
		},
	});
})(window.wp);
