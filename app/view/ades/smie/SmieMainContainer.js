Ext.define('Gprh.ades.view.ades.smie.SmieMainContainer', {
	extend: 'Ext.tab.Panel',
	xtype: 'smie',

	requires: [
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.grid.column.Date',
		'Gprh.ades.util.Globals',
		'Gprh.ades.view.ades.smie.SmieViewModel',
		'Gprh.ades.model.SmieModel',
	],

	mixins: [
		'Gprh.ades.util.RequestCapable',
	],

	controller: 'adesController',

	viewModel: {
		type: 'smieViewModel',
	},

	cls: 'shadow',
	activeTab: 0,
	bodyPadding: 15,

	// grid default height
	gridHeight: 450,

	initComponent() {
		const rowEditing = Gprh.ades.util.Globals.setRowEditingConfig('server-scripts/smie/Smie.php', this);

		const grid = {
			xtype: 'gridpanel',
			cls: 'user-grid',
			title: 'Organismes d\'affiliation médicale',
			routeId: 'smieTabId',
			itemId: 'smieGridId',
			bind: {
				store: '{smieResults}',
			},
			height: this.gridHeight,
			columns: [
				{
					xtype: 'gridcolumn',
					width: 40,
					dataIndex: 'idSmie',
					text: '#',
				},
				{
					xtype: 'gridcolumn',
					width: 40,
					dataIndex: 'nomSmie',
					text: 'Organisme d\'affiliation',
					align: 'left',
					flex: 1,
					editor: {
						allowBlank: false,
					},
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'plafondSmie',
					text: 'Plafond (Ariary)',
					align: 'left',
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
					dataIndex: 'deductionEmploye',
					text: 'Part employé (%)',
					align: 'left',
					flex: 1,
					editor: {
						allowBlank: false,
					},
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'deductionEmployeur',
					text: 'Part employeur (%)',
					align: 'left',
					flex: 1,
					editor: {
						allowBlank: false,
					},
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'coutExcedentaire',
					text: 'Coût excédentaire (Ariary)',
					align: 'left',
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
					dataIndex: 'franchiseCoutExcendentaire',
					text: 'Franchise (Ariary)',
					align: 'left',
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
					dataIndex: 'datePriseEffetSmie',
					width: 135,
					editor: {
						xtype: 'datefield',
						allowBlank: false,
						format: 'm/d/Y',
						minText: 'Cannot have a start date before the company existed!',
					},
				},
				{
					xtype: 'checkcolumn',
					header: 'Actif',
					dataIndex: 'actifSmie',
					width: 60,
					editor: {
						xtype: 'checkbox',
						cls: 'x-grid-checkheader-editor',
					},
					listeners: {
						/* checkchange: 'confirmActifCnaps', */
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
						store: '{smieResults}',
					},
				},
			],
			tbar: [
				'->', 
				{
					text: 'Nouveau organisme',
					iconCls: 'fa fa-plus',
					margin: '0 0 10 0',
					handler: () => {
						rowEditing.cancelEdit();
										
						const r = Ext.create('Gprh.ades.model.SmieModel', {
							idSmie: '',
							nomSmie: '',
							plafondSmie: '',
							deductionEmploye: 0,
							deductionEmployeur: 0,
							coutExcedentaire: 0,
							franchiseCoutExcendentaire: 0,
							datePriseEffetSmie: Ext.Date.clearTime(new Date()),
							actifSmie: false,
						});
	
						this.down('#smieGridId').getStore().insert(0, r);
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
