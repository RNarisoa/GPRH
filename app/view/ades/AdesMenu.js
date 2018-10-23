Ext.define('Gprh.ades.view.ades.AdesMenu', {
	extend: 'Ext.menu.Menu',

	alias: 'widget.adesmenu',

	viewModel: {
		type: 'adesmenu',
	},

	title: 'ADES',

	iconCls: 'x-fa fa-home',

	floating: false,

	items: [
		{
			routeId: 'adesInformations',
			itemId: 'adesInformationsMId',
			iconCls: 'x-fa fa-inbox',
			text: 'Information sur ADES',
			listeners: {
				click: 'onBackBtnClick',
			},
		},
		{
			routeId: 'structures',
			itemId: 'structuresMId',
			iconCls: 'x-fa fa-sitemap',
			text: 'Centres & départements',
			listeners: {
				click: 'onStructuresClick',
			},
		},
		{
			routeId: '',
			iconCls: 'x-fa fa-umbrella',
			text: 'CNaPS',
		},
		{
			routeId: '',
			iconCls: 'x-fa fa-exclamation-circle',
			text: 'IRSA',
		},
		{
			routeId: '',
			iconCls: 'x-fa fa-medkit',
			text: 'Centres médicaux',
		},
		{
			routeId: '',
			iconCls: 'x-fa fa-hospital-o',
			text: 'Hospitalisation',
		},
		{
			routeId: '',
			iconCls: 'x-fa fa-columns',
			text: 'Grille salariale',
		},
	],
});
