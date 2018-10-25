Ext.define('Gprh.ades.view.ades.irsa.IrsaMainContainer', {
	extend: 'Ext.tab.Panel',
	xtype: 'irsa',

	requires: [
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.grid.column.Date',
		'Gprh.ades.util.Globals',
		'Gprh.ades.view.ades.irsa.IrsaViewModel',
		'Gprh.ades.model.IrsaModel',
	],

	mixins: [
		'Gprh.ades.util.RequestCapable',
	],

	controller: 'adesController',

	viewModel: {
		type: 'irsaViewModel',
	},

	cls: 'shadow',
	activeTab: 0,
	bodyPadding: 15,

	// grid default height
	gridHeight: 450,
	
	initComponent() {
		const rowEditing = Gprh.ades.util.Globals.setRowEditingConfig('server-scripts/irsa/Irsa.php', this);

		const grid = {
			xtype: 'gridpanel',
			cls: 'user-grid',
			title: 'IRSA',
			routeId: 'irsaTabId',
			itemId: 'irsaGridId',
			bind: {
				store: '{irsaResults}',
			},
			height: this.gridHeight,
			columns: [
				{
					xtype: 'gridcolumn',
					width: 40,
					dataIndex: 'idIrsa',
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
					dataIndex: 'plafond',
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
					dataIndex: 'pourcentageEmployeIrsa',
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
					dataIndex: 'pourcentageEmployeurIrsa',
					text: 'Part employeur (%)',
					align: 'right',
					flex: 1,
					editor: {
						allowBlank: false,
					},
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'deductionEnfant',
					text: 'Déduction enfant (Ariary)',
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
					xtype: 'datecolumn',
					header: 'Date prise d\'effet',
					dataIndex: 'datePriseEffetIrsa',
					width: 135,
					editor: {
						xtype: 'datefield',
						allowBlank: false,
						format: 'd/m/Y',
						minText: 'Cannot have a start date before the company existed!',
					},
				},
				{
					xtype: 'checkcolumn',
					header: 'Actif',
					dataIndex: 'actifIrsa',
					width: 60,
					editor: {
						xtype: 'checkbox',
						cls: 'x-grid-checkheader-editor',
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
						store: '{irsaResults}',
					},
				},
			],
			tbar: [
				'->', 
				{
					text: 'Nouveau IRSA',
					iconCls: 'fa fa-plus',
					margin: '0 0 10 0',
					handler: () => {
						rowEditing.cancelEdit();
										
						const r = Ext.create('Gprh.ades.model.IrsaModel', {
							idIrsa: '',
							idAdes: '',
							plafond: '',
							pourcentageEmployeIrsa: 0,
							pourcentageEmployeurIrsa: 0,
							deductionEnfant: 0,
							datePriseEffetIrsa: Ext.Date.clearTime(new Date()),
							actifIrsa: false,
						});
	
						this.down('#irsaGridId').getStore().insert(0, r);
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
