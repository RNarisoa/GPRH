Ext.define('Gprh.ades.view.ades.grille.SalaireBasePanel', {
	extend: 'Ext.form.Panel',
	alias: 'widget.salaireBasePanel',

	requires: [
		'Gprh.ades.util.Globals',
		'Gprh.ades.view.ades.grille.SalaireBaseViewModel',
	],
	
	viewModel: {
		type: 'salaireBaseViewModel',
	},

	controller: 'adesController',

	defaults: {
		/*
         * Seek out the first enabled, focusable, empty textfield when the form is focused
         */
		defaultFocus: 'textfield:not([value]):focusable:not([disabled])',
	},

	colorScheme: 'soft-green',
	bodyPadding: 15,

	initComponent() {
		const record = this.params;
		
		this.items = {
			xtype: 'form',
			itemId: 'salaireBasePanelFormId',
			defaultType: 'textfield',
			defaults: {
				labelWidth: 150,
				labelAlign: 'left',
				labelSeparator: ':',
				submitEmptyText: false,
			},
			items: [
				{
					fieldLabel: 'ID_LIGNE_GRILLE',
					name: 'idLigneGrille',
					itemId: 'idLigneGrilleId',
					anchor: '100%',
					hidden: true,
				},
				{
					fieldLabel: 'ID_GROUPE',
					name: 'idGroupe',
					itemId: 'idGroupeId',
					anchor: '100%',
					value: record.data.idGroupeCategorie,
					hidden: true,
				},
				{
					fieldLabel: 'ID_CATEGORIE',
					name: 'idCategorie',
					itemId: 'idCategorieId',
					anchor: '100%',
					value: record.data.idCategorie,
					hidden: true,
				},
				{
					xtype: 'component',
					html: `${'<div class="services-legend">'
						+ '<span><div class="legend-finance"></div><u>Groupe:</u> <b>'}${record.data.nomGroupe}</b></span>`
                        + `<span><div class="legend-research"></div><u>Catégorie:</u><b>${record.data.categorieProfessionnelle}</b></span>`
						+ '<div>',
				},
				{
					fieldLabel: 'Salaire de base Min',
					name: 'salaireBaseMinimum',
					itemId: 'salaireBaseMinimumid',
					anchor: '100%',
					listeners: {
						blur: self => Gprh.ades.util.Globals.formatNumber(self),
					},
					allowBlank: false,
				},
				{
					fieldLabel: 'Salaire de base (>3ans)',
					name: 'salaireBase3',
					itemId: 'salaireBase3id',
					anchor: '100%',
					listeners: {
						blur: self => Gprh.ades.util.Globals.formatNumber(self),
					},
					value: 0,
				},
				{
					fieldLabel: 'Salaire de base (>4ans)',
					name: 'salaireBase4',
					itemId: 'salaireBase4id',
					anchor: '100%',
					listeners: {
						blur: self => Gprh.ades.util.Globals.formatNumber(self),
					},
					value: 0,
				},
				{
					fieldLabel: 'Salaire de base (>5ans)',
					name: 'salaireBase5',
					itemId: 'salaireBase5id',
					anchor: '100%',
					listeners: {
						blur: self => Gprh.ades.util.Globals.formatNumber(self),
					},
					value: 0,
				},
				{
					xtype: 'checkboxfield',
					fieldLabel: 'Valeurs utilisées actuelles',
					name: 'actifLigneGrille',
					itemId: 'actifLigneGrilleid',
				},
				{					
					xtype: 'datefield',
					fieldLabel: 'Date prise d\'effet',
					name: 'datePriseEffetGrille',
					allowBlank: false,
					format: 'd/m/Y',
					submitFormat: 'Y-m-d',
					minText: 'Cannot have a start date before the company existed!',					
					value: Ext.Date.format(new Date(), 'd/m/Y'),
				},
				{
					xtype: 'toolbar',
					cls: 'wizard-form-break',
					defaults: {
						flex: 1,
					},
					width: 300,
					layout: 'hbox',
					items: [
						{
							itemId: 'salaireBasePanelSaveBtn',
							xtype: 'button',
							text: 'Enregistrer',
							ui: 'soft-green-small',
							margin: '10 10 0 0',
							listeners: {
								click: 'onSalaireBasePanelSaveClick',
							},
						},
						{
							itemId: 'salaireBasePanelCancelBtn',
							xtype: 'button',
							text: 'Annuler',
							ui: 'soft-blue-small',
							margin: '10 0 0 0',
							listeners: {
								click: 'onSalaireBasePanelCancelClick',
							},
						},
					],
				},
				{
					xtype: 'component',
					html: '<div><span>* Unité monetaire utilisé: <b>Ariary</b></span></div>',
				},
			],
		};

		this.callParent();
	},
});
