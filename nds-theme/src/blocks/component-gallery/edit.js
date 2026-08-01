(function (wp) {
	'use strict';

	if (!wp || !wp.blocks || !wp.element || !wp.blockEditor) {
		return;
	}

	var el = wp.element.createElement;
	var __ = wp.i18n.__;
	var registerBlockType = wp.blocks.registerBlockType;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var SelectControl = wp.components.SelectControl;
	var RangeControl = wp.components.RangeControl;
	var ToggleControl = wp.components.ToggleControl;

	function postTypes() {
		var out = [];
		if (window.wp && window.wp.data) {
			var types = window.wp.data.select('core').getPostTypes({ per_page: -1 });
			if (types && types.length) {
				types.forEach(function (t) {
					if (t.viewable) {
						out.push({ label: t.labels.name, value: t.slug });
					}
				});
			}
		}
		if (!out.length) {
			out = [
				{ label: __('Components', 'nds-theme'), value: 'nds_component' },
				{ label: __('Services', 'nds-theme'), value: 'nds_service' },
				{ label: __('Posts', 'nds-theme'), value: 'post' },
			];
		}
		return out;
	}

	registerBlockType('nds/component-gallery', {
		title: __('NDS Component Gallery', 'nds-theme'),
		icon: 'grid-view',
		category: 'design',
		edit: function (props) {
			var blockProps = useBlockProps({ className: 'nds-gallery-editor' });
			var a = props.attributes;

			return el(
				wp.element.Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __('Gallery settings', 'nds-theme') },
						el(SelectControl, {
							label: __('Content type', 'nds-theme'),
							value: a.postType,
							options: postTypes(),
							onChange: function (v) { props.setAttributes({ postType: v }); },
						}),
						el(RangeControl, { label: __('Items per page', 'nds-theme'), value: a.perPage, min: 3, max: 24, onChange: function (v) { props.setAttributes({ perPage: v }); } }),
						el(RangeControl, { label: __('Columns', 'nds-theme'), value: a.columns, min: 1, max: 4, onChange: function (v) { props.setAttributes({ columns: v }); } }),
						el(ToggleControl, { label: __('Show search', 'nds-theme'), checked: a.showSearch, onChange: function (v) { props.setAttributes({ showSearch: v }); } })
					)
				),
				el(
					'div',
					blockProps,
					el('p', { className: 'nds-block-note' }, __('Component Gallery: renders a searchable, paginated grid of ', 'nds-theme') + a.postType + __(' on the front end.', 'nds-theme'))
				)
			);
		},
		save: function () {
			return null; // Dynamic: rendered by render.php.
		},
	});
})(window.wp);
