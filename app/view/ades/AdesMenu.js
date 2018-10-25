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
			routeId: 'cnaps',
			itemId: 'cnapsMId',
			iconCls: 'x-fa fa-umbrella',
			text: 'CNaPS',
			listeners: {
				click: 'onCnapsClick',
			},
		},
		{
			routeId: 'irsa',
			itemId: 'irsaMId',
			iconCls: 'x-fa fa-exclamation-circle',
			text: 'IRSA',
			listeners: {
				click: 'onIrsaClick',
			},
		},
		{
			routeId: 'smie',
			itemId: 'smieMId',
			iconCls: 'x-fa fa-medkit',
			text: 'Affiliation médicale',
			listeners: {
				click: 'onSmieClick',
			},
		},
		{
			routeId: 'hopital',
			itemId: 'hopitalMId',
			iconCls: 'x-fa fa-hospital-o',
			text: 'Hospitalisation',
			listeners: {
				click: 'onHopitalClick',
			},
		},
		{
			routeId: 'grille',
			itemId: 'grilleMId',
			iconCls: 'x-fa fa-columns',
			text: 'Grille salariale',
			listeners: {
				click: 'onGrilleClick',
			},
		},
	],
});
