Ext.define('Gprh.ades.view.ades.hopital.HopitalMainContainer', {
	extend: 'Ext.tab.Panel',
	xtype: 'hopital',

	requires: [
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.grid.column.Date',
		'Gprh.ades.view.ades.hopital.HopitalViewModel',
		'Gprh.ades.model.HopitalModel',
	],

	mixins: [
		'Gprh.ades.util.RequestCapable',
	],

	controller: 'adesController',

	viewModel: {
		type: 'hopitalViewModel',
	},

	cls: 'shadow',
	activeTab: 0,
	bodyPadding: 15,

	// grid default height
	gridHeight: 450,

	initComponent() {
		const rowEditing = this.setRowEditingConfig('server-scripts/hopital/Hopital.php', '#hopitalGridId');

		const grid = {
			xtype: 'gridpanel',
			cls: 'user-grid',
			title: 'Caisse hospitalière',
			routeId: 'hopitalTabId',
			itemId: 'hopitalGridId',
			bind: {
				store: '{hopitalResults}',
			},
			height: this.gridHeight,
			columns: [
				{
					xtype: 'gridcolumn',
					width: 40,
					dataIndex: 'idHopital',
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
					dataIndex: 'pourcentageEmployeHopital',
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
					dataIndex: 'pourcentageEmployeurHopital',
					text: 'Part employeur (%)',
					align: 'left',
					flex: 1,
					editor: {
						allowBlank: false,
					},
				},
				{
					xtype: 'datecolumn',
					header: 'Date prise d\'effet',
					dataIndex: 'datePriseEffetHopital',
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
					dataIndex: 'actifHopital',
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
						store: '{hopitalResults}',
					},
				},
			],
			tbar: [
				'->', 
				{
					text: 'Nouvelle formule',
					iconCls: 'fa fa-plus',
					margin: '0 0 10 0',
					handler: () => {
						rowEditing.cancelEdit();
										
						const r = Ext.create('Gprh.ades.model.HopitalModel', {
							idHopital: '',
							idAdes: '',
							pourcentageEmployeHopital: 0,
							pourcentageEmployeurHopital: 0,
							datePriseEffetHopital: Ext.Date.clearTime(new Date()),
							actifHopital: false,
						});
	
						this.down('#hopitalGridId').getStore().insert(0, r);
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

	/*
	 * Set all configuration values to edit grid row
	 * @param 
	 */
	/**
	 * Set all configuration values to edit grid row when the user clicks Update or Cancel button.
	 * @param {string} url the proxy url to find data from server.
	 * @param {string} gridId the grid id to load after success result
	 * @return {object} this {@link Ext.grid.plugin.RowEditing}
	 * @private
	 */
	setRowEditingConfig(url, gridId) {
		return Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
			autoCancel: false,
			listeners: {
				validateedit: (editor, context) => {
					const me = this;

					const model = {
						infoRequest: 2,
						data: context.newValues,
					};
					const saveOrUpdate = this.requestSaveOrUpdate(url, model);
					console.log(saveOrUpdate.request);
					if (saveOrUpdate.request.responseText > 0) {
						me.down(gridId).getStore().reload();
					}
				},
				canceledit: () => {
					const me = this;
					me.down(gridId).getStore().reload();
				},
			},
		});
	},
});
