Ext.define('Gprh.ades.view.ades.AdesInformationForm', {
	extend: 'Ext.panel.Panel',
	xtype: 'adesInformationForm',
	requires: [
		
	],

	controller: 'adesController',

	defaults: {
		/*
         * Seek out the first enabled, focusable, empty textfield when the form is focused
         */
		defaultFocus: 'textfield:not([value]):focusable:not([disabled])',
	},

	cls: 'wizardthree shadow',
	colorScheme: 'soft-green',
	userCls: 'big-50 small-100',
	bodyPadding: 15,

	initComponent() {
		const data = this.initialConfig;
		this.items = {
			xtype: 'container',
			layout: {
				type: 'vbox',
				align: 'stretch',
			},
			items: [
				{
					xtype: 'form',
					itemId: 'adesInformationFormId',
					defaultType: 'textfield',
					defaults: {
						labelWidth: 150,
						labelAlign: 'left',
						labelSeparator: ':',
						submitEmptyText: false,
					},
					items: [
						{
							fieldLabel: 'ID_ADES',
							name: 'ID_ADES',
							itemId: 'ID_ADES_id',
							anchor: '100%',
							value: data.ID_ADES,
							hidden: true,
						},
						{
							name: 'RAISON_SOCIALE',
							itemId: 'RAISON_SOCIALE_id',
							fieldLabel: 'Raison sociale',
							anchor: '100%',
							value: data.RAISON_SOCIALE,
						},
						{
							name: 'ADRESSE_COMPLETE',
							itemId: 'ADRESSE_COMPLETE_id',
							fieldLabel: 'Adresse complète',
							anchor: '100%',
							value: data.ADRESSE_COMPLETE,
						},
						{
							name: 'NIF',
							itemId: 'NIF_id',
							fieldLabel: 'NIF',
							anchor: '100%',
							value: data.NIF,
						},
						{
							name: 'STAT',
							itemId: 'STAT_id',
							fieldLabel: 'STAT',
							anchor: '100%',
							value: data.STAT,
						},
						{
							name: 'TELEPHONE',
							itemId: 'TELEPHONE_id',
							fieldLabel: 'TELEPHONE',
							anchor: '100%',
							value: data.TELEPHONE,
						},
						{
							xtype: 'textareafield',
							name: 'DESCRIPTION_ADES',
							itemId: 'DESCRIPTION_ADES_id',
							fieldLabel: 'Description',
							anchor: '100%',
							value: data.DESCRIPTION_ADES,
						},
						{
							name: 'SITE_WEB',
							itemId: 'SITE_WEBS_id',
							fieldLabel: 'Site web',
							anchor: '100%',
							value: data.SITE_WEB,
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
									itemId: 'adesInformationBtn',
									xtype: 'button',
									text: 'Enregistrer',
									ui: 'soft-green-small',
									margin: '10 10 0 0',
									listeners: {
										click: 'onAdesInformationSaveClick',
									},
								},
								{
									itemId: 'adesInformationBtnReset',
									xtype: 'button',
									text: 'Annuler',
									ui: 'soft-blue-small',
									margin: '10 0 0 0',
									listeners: {
										click: 'onAdesInformationSaveClick',
									},
								},
							],
						},
					],
				},
			],
		};

		this.tbar = {
			reference: 'progress',
			defaultButtonUI: `wizard-${this.colorScheme}`,
			cls: 'wizardprogressbar',
			defaults: {
				disabled: true,
				iconAlign: 'top',
			},
			layout: {
				pack: 'center',
			},
			items: [
				{
					step: 0,
					pressed: true,
					enableToggle: true,
					text: 'Informations générales sur ADES',
				},
			],
		};

		this.callParent();
	},
});
