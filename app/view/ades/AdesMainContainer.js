Ext.define('Gprh.ades.view.ades.AdesMainContainer', {
	extend: 'Ext.container.Container',

	xtype: 'adesMainContainer',

	requires: [
		'Gprh.ades.view.ades.AdesController',
		'Gprh.ades.view.ades.AdesMenu',
		'Gprh.ades.view.ades.FormulesMenu',
		'Gprh.ades.view.ades.AdesInformations',
	],

	controller: 'adesController',

	itemId: 'adesMainContainer',	

	layout: {
		type: 'hbox',
		align: 'stretch',
	},

	margin: '20 0 0 20',

	items: [
		{
			xtype: 'container',

			itemId: 'navigationPanel',

			layout: {
				type: 'vbox',
				align: 'stretch',
			},

			width: '30%',
			minWidth: 180,
			maxWidth: 240,

			defaults: {
				cls: 'navigation-email',
				margin: '0 20 20 0',
			},

			items: [
				{
					xtype: 'adesmenu',
					listeners: {
						click: 'onMenuClick',
					},
				},
				{
					xtype: 'formulesmenu',
				},
			],
		},
		{
			xtype: 'container',
			itemId: 'contentPanel',
			margin: '0 20 20 0',
			flex: 1,
			layout: {
				type: 'anchor',
				anchor: '100%',
			},
			items: [
				{
					xtype: 'adesInformations',
				},
			],
		},
	],
});
