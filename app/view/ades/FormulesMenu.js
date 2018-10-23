Ext.define('Gprh.ades.view.ades.FormulesMenu', {
	extend: 'Ext.menu.Menu',

	alias: 'widget.formulesmenu',

	viewModel: {
		type: 'formulesmenu',
	},

	title: 'Formules de calcul',

	iconCls: 'x-fa fa-briefcase',

	floating: false,

	items: [
		{
			routeId: '',
			iconCls: 'x-fa fa-tasks',
			text: 'Voir les formules',
		},
	],
});
