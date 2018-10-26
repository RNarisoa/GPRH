Ext.define('Gprh.ades.view.ades.cnaps.CnapsMainContainer', {
	extend: 'Ext.tab.Panel',
	xtype: 'cnaps',

	requires: [
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.grid.column.Date',
		'Gprh.ades.util.Globals',
		'Gprh.ades.view.ades.cnaps.CnapsViewModel',
		'Gprh.ades.model.CnapsModel',
	],

	mixins: [
		'Gprh.ades.util.RequestCapable',
	],

	controller: 'adesController',

	viewModel: {
		type: 'cnapsViewModel',
	},

	cls: 'shadow',
	activeTab: 0,
	bodyPadding: 15,

	// grid default height
	gridHeight: 450,

	initComponent() {
		const rowEditing = Gprh.ades.util.Globals.setRowEditingConfig('server-scripts/cnaps/Cnaps.php', this);

		const grid = {
			xtype: 'gridpanel',
			cls: 'user-grid',
			title: 'CNaPS',
			routeId: 'cnapsTabId',
			itemId: 'cnapsGridId',
			bind: {
				store: '{cnapsResults}',
			},
			height: this.gridHeight,
			columns: [
				{
					xtype: 'gridcolumn',
					width: 40,
					dataIndex: 'idCnaps',
					text: '#',
				},
				{
					xtype: 'gridcolumn',
					width: 40,
					dataIndex: 'idAdes',
					text: 'idAdes',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'plafondCnaps',
					text: 'Plafond (Ariary)',
					align: 'right',
					flex: 1,
					editor: {
						allowBlank: false,
						listeners: {
							blur: self => Gprh.ades.util.Globals.formatNumber(self),
						},
					},
					renderer: value => Gprh.ades.util.Globals.formatRenderNumber(value),
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'pourcentageEmployeCnaps',
					text: 'Part employé (%)',
					align: 'right',
					flex: 1,
					editor: {
						allowBlank: false,
					},
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'pourcentageEmployeurCnaps',
					text: 'Part employeur (%)',
					align: 'right',
					flex: 1,
					editor: {
						allowBlank: false,
					},
				},
				{
					xtype: 'datecolumn',
					header: 'Date prise d\'effet',
					dataIndex: 'datePriseEffetCnaps',
					width: 135,
					format: 'd/m/Y',
					editor: {
						xtype: 'datefield',
						allowBlank: false,
						format: 'd/m/Y',
						minText: 'Cannot have a start date before the company existed!',
						submitFormat: 'Y-m-d',		
					},
				},
				{
					xtype: 'checkcolumn',
					header: 'Actif',
					dataIndex: 'actifCnaps',
					width: 60,
					editor: {
						xtype: 'checkboxfield',
						cls: 'x-grid-checkheader-editor',
					},
					listeners: {
						checkchange: 'confirmActifCnaps',
					},
				},
			],
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					itemId: 'userPaginationToolbar',
					displayInfo: true,
					bind: {
						store: '{cnapsResults}',
					},
				},
			],
			tbar: [
				'->', 
				{
					text: 'Nouveau CNaPS',
					iconCls: 'fa fa-plus',
					margin: '0 0 10 0',
					handler: () => {
						rowEditing.cancelEdit();
										
						const r = Ext.create('Gprh.ades.model.CnapsModel', {
							idCnaps: '',
							idAdes: '',
							plafondCnaps: '',
							pourcentageEmployeCnaps: 0,
							pourcentageEmployeurCnaps: 0,
							datePriseEffetCnaps: Ext.Date.clearTime(new Date()),
							actifCnaps: false,
						});
	
						this.down('#cnapsGridId').getStore().insert(0, r);
						rowEditing.startEdit(0, 0);
					},
				}],
			plugins: [rowEditing],
		};

		this.items = [
			grid,
		];
		this.layout = 'fit';

		this.callParent();
	},
});
