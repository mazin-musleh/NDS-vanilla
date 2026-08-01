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

	registerBlockType('nds/tabs', {
		title: __('NDS Tabs', 'nds-theme'),
		icon: 'table-row-after',
		category: 'design',
		edit: function () {
			var blockProps = useBlockProps({ className: 'nds-tabs-editor' });

			return el(
				'div',
				blockProps,
				el('p', { className: 'nds-block-note' }, __('Each NDS Tab block inside is one tab. Set its title in the sidebar.', 'nds-theme')),
				el(InnerBlocks, {
					allowedBlocks: ['nds/tab'],
					template: [
						['nds/tab', { title: __('Tab one', 'nds-theme') }],
						['nds/tab', { title: __('Tab two', 'nds-theme') }],
					],
				})
			);
		},
		save: function (props, innerBlocks) {
			var blockProps = wp.blockEditor.useBlockProps.save({ className: 'nds-tabs' });
			var tabs = (innerBlocks || []).map(function (block, i) {
				return el(
					'button',
					{
						type: 'button',
						key: i,
						role: 'tab',
						className: 'nds-tab',
						id: 'nds-tab-' + i,
						'aria-selected': i === 0 ? 'true' : 'false',
						'aria-controls': 'nds-tab-panel-' + i,
						tabIndex: i === 0 ? 0 : -1,
					},
					block.attributes.title || __('Tab', 'nds-theme')
				);
			});

			return el(
				'div',
				blockProps,
				el('div', { className: 'nds-tab-list', role: 'tablist', 'aria-label': __('Tabs', 'nds-theme') }, tabs),
				el('div', { className: 'nds-tab-content' }, el(InnerBlocks.Content))
			);
		},
	});
})(window.wp);
