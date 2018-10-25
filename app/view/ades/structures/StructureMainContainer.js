Ext.define('Gprh.ades.view.ades.structures.StructureMainContainer', {
	extend: 'Ext.tab.Panel',
	xtype: 'structures',

	requires: [
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.grid.column.Date',
		'Gprh.ades.view.ades.structures.StructuresModel',
		'Gprh.ades.model.CentreModel',
		'Gprh.ades.model.DepartementModel',
	],

	mixins: [
		'Gprh.ades.util.RequestCapable',
	],

	controller: 'adesController',

	viewModel: {
		type: 'structuresModel',
	},

	cls: 'shadow',
	activeTab: 0,
	bodyPadding: 15,

	// grid default height
	gridHeight: 450,

	initComponent() {
		const rowEditing = this.setRowEditingConfig('server-scripts/centreDepartement/Centre.php', '#centreGridId');

		const rowEditingDepartement = this.setRowEditingConfig('server-scripts/centreDepartement/Departement.php', '#departementGridId');
		
		const grid = {
			xtype: 'gridpanel',
			cls: 'user-grid',
			title: 'Centres',
			routeId: 'centreTabId',
			itemId: 'centreGridId',
			bind: {
				store: '{centreResults}',
			},
			height: this.gridHeight,
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
					editor: {
						// defaults to textfield if no xtype is supplied
						allowBlank: false,
					},
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'nomCentre',
					text: 'Nom du Centre',
					align: 'left',
					flex: 1,
					editor: {
						// defaults to textfield if no xtype is supplied
						allowBlank: false,
					},
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'adresseCentre',
					text: 'Adresse du Centre',
					align: 'left',
					flex: 1,
					editor: {
						// defaults to textfield if no xtype is supplied
						allowBlank: false,
					},
				},
				/* {
					xtype: 'actioncolumn',
					items: [
						{
							renderer: () => '<span class="x-fa fa-close"></span>',
							iconCls: 'x-fa fa-close',
							handler: (record) => {
								console.log(record);
							},
						},
					],

					cls: 'content-column',
					width: 120,
					dataIndex: 'bool',
					text: 'Actions',
					tooltip: 'edit ',
				}, */
			],
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					itemId: 'userPaginationToolbar',
					displayInfo: true,
					bind: {
						store: '{centreResults}',
					},
				},
			],
			tbar: [
				'->', 
				{
					text: 'Nouveau centre',
					iconCls: 'fa fa-plus',
					margin: '0 0 10 0',
					handler: () => {
						rowEditing.cancelEdit();
										
						const r = Ext.create('Gprh.ades.model.CentreModel', {
							idCentre: '',
							abreviationCentre: '',
							nomCentre: '',
							adresseCentre: '',
						});
	
						this.down('#centreGridId').getStore().insert(0, r);
						rowEditing.startEdit(0, 0);
					},
				}],
			plugins: [rowEditing],
		};

		const gridDepartement = {
			xtype: 'gridpanel',
			cls: 'user-grid',
			title: 'Départements',
			itemId: 'departementGridId',
			routeId: 'departementTabId',
			bind: {
				store: '{departementResults}',
			},
			height: this.gridHeight,
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
					editor: {
						allowBlank: false,
					},
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'abreviationDepartement',
					text: 'Abréviation',
					align: 'left',
					flex: 1,
					editor: {
						allowBlank: false,
					},
				},
				/* {
					xtype: 'actioncolumn',
					items: [
						{
							xtype: 'button',
							iconCls: 'x-fa fa-close',
						},
					],

					cls: 'content-column',
					width: 120,
					dataIndex: 'bool',
					text: 'Actions',
					tooltip: 'edit ',
				}, */
			],
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					itemId: 'userPaginationToolbar',
					displayInfo: true,
					bind: {
						store: '{departementResults}',
					},
				},
			],
			tbar: [
				'->', 
				{
					text: 'Nouveau département',
					iconCls: 'fa fa-plus',
					margin: '0 0 10 0',
					handler: () => {
						rowEditingDepartement.cancelEdit();
										
						const r = Ext.create('Gprh.ades.model.DepartementModel', {
							idDepartement: '',
							nomDepartement: '',
							abreviationDepartement: '',
						});
	
						this.down('#departementGridId').getStore().insert(0, r);
						rowEditingDepartement.startEdit(0, 0);
					},
				}],
			plugins: [rowEditingDepartement],
		};
		this.items = [
			grid,
			gridDepartement,
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
