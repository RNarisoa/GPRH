Ext.define('Gprh.ades.view.ades.grille.GrilleMainContainer', {
	extend: 'Ext.tab.Panel',
	xtype: 'grille',

	requires: [
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.grid.column.Date',
		'Gprh.ades.util.Globals',
		'Gprh.ades.view.ades.grille.GrilleModel',
		'Gprh.ades.model.GroupeModel',
		'Gprh.ades.model.CategorieModel',
		'Gprh.ades.view.ades.grille.GrilleController',
	],

	mixins: [
		'Gprh.ades.util.RequestCapable',
	],

	controller: 'adesController',

	viewModel: {
		type: 'grilleModel',
	},

	cls: 'shadow',
	activeTab: 0,
	bodyPadding: 15,

	// grid default height
	gridHeight: 450,

	initComponent() {
		const rowEditing = Gprh.ades.util.Globals.setRowEditingConfig('server-scripts/grille/Groupe.php', this);

		const rowEditingCategorie = Gprh.ades.util.Globals.setRowEditingConfig('server-scripts/grille/Categorie.php', this);
		
		const grid = {
			xtype: 'gridpanel',
			cls: 'user-grid',
			title: 'Groupes',
			routeId: 'groupeTabId',
			itemId: 'groupeGridId',
			bind: {
				store: '{groupeResults}',
			},
			height: this.gridHeight,
			columns: [
				{
					xtype: 'gridcolumn',
					width: 40,
					dataIndex: 'idGroupeCategorie',
					text: '#',
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'nomGroupe',
					text: 'Nom du groupe',
					align: 'left',
					flex: 1,
					editor: {
						allowBlank: false,
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
						store: '{groupeResults}',
					},
				},
			],
			tbar: [
				'->', 
				{
					text: 'Nouveau Groupe',
					iconCls: 'fa fa-plus',
					margin: '0 0 10 0',
					handler: () => {
						rowEditing.cancelEdit();
										
						const r = Ext.create('Gprh.ades.model.GroupeModel', {
							idGroupeCategorie: '',
							nomGroupe: '',
						});
	
						this.down('#groupeGridId').getStore().insert(0, r);
						rowEditing.startEdit(0, 0);
					},
				}],
			plugins: [rowEditing],
		};

		const gridCategorie = {
			xtype: 'gridpanel',
			cls: 'user-grid',
			title: 'Catégories professionnelles',
			itemId: 'categorieGridId',
			routeId: 'categorieTabId',
			bind: {
				store: '{categorieResults}',
			},
			height: this.gridHeight,
			columns: [
				{
					xtype: 'gridcolumn',
					width: 40,
					dataIndex: 'idCategorie',
					text: '#',
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'nomGroupe',
					text: 'Groupe',
					align: 'left',
					flex: 1,
					editor: {
						xtype: 'combobox',
						store: 'groupeStore',
						queryMode: 'local',
						displayField: 'nomGroupe',
						valueField: 'idGroupeCategorie',
						renderTo: Ext.getBody(),
						allowBlank: false, 
						forceSelection: true,
						editable: false,
					},
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'categorieProfessionnelle',
					text: 'Catégorie professionnelle',
					align: 'left',
					flex: 1,
					editor: {
						allowBlank: false,
					},
				},
				{
					xtype: 'gridcolumn',
					cls: 'content-column',
					dataIndex: 'descriptionCategorie',
					text: 'Description',
					align: 'left',
					flex: 1,
					editor: {
						allowBlank: true,
					},
				},
				{
					xtype: 'actioncolumn',
					items: [
						{
							renderer: () => '<span class="x-fa fa-close"></span>',
							iconCls: 'x-fa fa-cog',
							tooltip: 'Détails des salaires de base',
							handler: 'showGrilleWindow',
						},
					],
					cls: 'content-column',
					width: 120,
					dataIndex: 'bool',
					text: 'Actions',
				},
			],
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					itemId: 'userPaginationToolbar',
					displayInfo: true,
					bind: {
						store: '{categorieResults}',
					},
				},
			],
			tbar: [
				'->', 
				{
					text: 'Nouvelle catégorie',
					iconCls: 'fa fa-plus',
					margin: '0 0 10 0',
					handler: () => {
						rowEditingCategorie.cancelEdit();
										
						const r = Ext.create('Gprh.ades.model.CategorieModel', {
							idCategorie: '',
							idGroupeCategorie: '',
							categorieProfessionnelle: '',
							descriptionCategorie: '',
						});
	
						this.down('#categorieGridId').getStore().insert(0, r);
						rowEditingCategorie.startEdit(0, 0);
					},
				}],
			plugins: [rowEditingCategorie],
		};
		this.items = [
			grid,
			gridCategorie,
		];
		this.layout = 'fit';

		this.callParent();
	},
});
