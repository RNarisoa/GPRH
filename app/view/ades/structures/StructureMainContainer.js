Ext.define('Gprh.ades.view.ades.structures.StructureMainContainer', {
	extend: 'Ext.tab.Panel',
	xtype: 'structures',

	requires: [
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.grid.column.Date',
		'Gprh.ades.view.ades.structures.StructuresModel',
	],

	controller: 'adesController',

	viewModel: {
		type: 'structuresModel',
	},

	cls: 'shadow',
	activeTab: 0,
	margin: 20,
	bodyPadding: 15,

	items: [
		{
			xtype: 'gridpanel',
			cls: 'user-grid',
			title: 'Centres',
			routeId: 'centreTabId',
			bind: '{centreResults}',
			scrollable: false,
			columns: [
				{
					xtype: 'gridcolumn',
					width: 40,
					dataIndex: 'idCentre',
					text: '#',
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'abreviationCentre',
					text: 'Abréviation',
					align: 'left',
					flex: 1,
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'nomCentre',
					text: 'Nom du Centre',
					align: 'left',
					flex: 1,
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'adresseCentre',
					text: 'Adresse du Centre',
					align: 'left',
					flex: 1,
				},
				{
					xtype: 'actioncolumn',
					items: [
						{
							xtype: 'button',
							iconCls: 'x-fa fa-pencil',
						},
						{
							xtype: 'button',
							iconCls: 'x-fa fa-close',
						},
						{
							xtype: 'button',
							iconCls: 'x-fa fa-ban',
						},
					],

					cls: 'content-column',
					width: 120,
					dataIndex: 'bool',
					text: 'Actions',
					tooltip: 'edit ',
				},
			],
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					itemId: 'userPaginationToolbar',
					displayInfo: true,
					bind: '{centreResults}',
				},
			],
		},
		{
			xtype: 'gridpanel',
			cls: 'user-grid',
			title: 'Départements',
			routeId: 'departementTabId',
			bind: '{departementResults}',
			scrollable: false,
			columns: [
				{
					xtype: 'gridcolumn',
					width: 40,
					dataIndex: 'idDepartement',
					text: '#',
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'nomDepartement',
					text: 'Nom du département',
					align: 'left',
					flex: 1,
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'abreviationDepartement',
					text: 'Abréviation',
					align: 'left',
					flex: 1,
				},
				{
					xtype: 'actioncolumn',
					items: [
						{
							xtype: 'button',
							iconCls: 'x-fa fa-pencil',
						},
						{
							xtype: 'button',
							iconCls: 'x-fa fa-close',
						},
						{
							xtype: 'button',
							iconCls: 'x-fa fa-ban',
						},
					],

					cls: 'content-column',
					width: 120,
					dataIndex: 'bool',
					text: 'Actions',
					tooltip: 'edit ',
				},
			],
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					itemId: 'userPaginationToolbar',
					displayInfo: true,
					bind: '{departementResults}',
				},
			],
		},
	],
});
