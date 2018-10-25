Ext.define('Gprh.ades.view.ades.AdesController', {
	extend: 'Ext.app.ViewController',

	requires: [
		'Gprh.ades.view.ades.AdesInformationForm',
		'Gprh.ades.view.ades.structures.StructureMainContainer',
		'Gprh.ades.view.ades.cnaps.CnapsMainContainer',
		'Gprh.ades.view.ades.irsa.IrsaMainContainer',
		'Gprh.ades.view.ades.smie.SmieMainContainer',
		'Gprh.ades.view.ades.hopital.HopitalMainContainer',
		'Gprh.ades.view.ades.grille.GrilleMainContainer',
		'Gprh.ades.view.pages.PrototypeWindow',
		'Gprh.ades.view.ades.grille.SalaireBasePanel',
	],

	mixins: [
		'Gprh.ades.util.RequestCapable',
	],

	alias: 'controller.adesController',

	init() {
		this.setCurrentView('adesInformations');
	},

	onBackBtnClick() {
		this.setCurrentView('adesInformations');
	},

	onMenuClick(menu, item) {
		if (item && item.routeId === 'emailcompose') {
			this.setCurrentView(item.routeId, item.params);
		}
	},

	setCurrentView(view, params) {
		const contentPanel = this.getView().down('#contentPanel');
		// We skip rendering for the following scenarios:
		// * There is no contentPanel
		// * view xtype is not specified
		// * current view is the same
		if (!contentPanel || view === '' || (contentPanel.down() && contentPanel.down().xtype === view)) {
			return false;
		}

		if (params && params.openWindow) {
			const cfg = Ext.apply({
				xtype: 'prototypeWindow',
				items: [
					Ext.apply({
						xtype: view,
					}, params.targetCfg),
				],
			}, params.windowCfg);

			Ext.create(cfg);
		} else {
			Ext.suspendLayouts();

			contentPanel.removeAll(true);
			contentPanel.add(
				Ext.apply({
					xtype: view,
				}, params)
			);

			Ext.resumeLayouts(true);
		}
		return true;
	},

	onAdesInformationEditClick(item) {
		this.setCurrentView('adesInformationForm', item.params);
	},

	onAdesInformationSaveClick(view) {
		const me = this;
		const form = view.up('form');

		const model = {
			infoRequest: 2,
			data: form.getValues(),
		};
		const saveOrUpdate = this.requestSaveOrUpdate('server-scripts/ades/Ades.php', model);
		
		if (saveOrUpdate.request.request.result.responseText > 0) {
			const mainView = me.getView().up('#adesMainContainer');
			
			mainView.down('#adesInformationsMId').fireEvent('click');
		}
	},

	onAdesInformationCancelClick() {
		const me = this;
		const mainView = me.getView().up('#adesMainContainer');
			
		mainView.down('#adesInformationsMId').fireEvent('click');
	},

	onStructuresClick() {
		this.setCurrentView('structures');
	},

	onCnapsClick() {
		this.setCurrentView('cnaps');
	},

	onIrsaClick() {
		this.setCurrentView('irsa');
	},

	onSmieClick() {
		this.setCurrentView('smie');
	},

	onHopitalClick() {
		this.setCurrentView('hopital');
	},
	
	onGrilleClick() {
		this.setCurrentView('grille');
	},

	/*
	 * Create a new form to fill all wadges for the given categorie
	 * @param {object} view the Tab panel view
	 * @param {int} rowIndex selected rowIndex
	 * @param {int} colIndex selected colIndex
	 * @param {object} item all items config where the event was handled
	 * @param {object} e the event
	 * @param {object} record selected row data
	 * @param {object} row dom element for the row selected
	 * 
	 * @return {object} {@link Gprh.ades.grille.SalaireBase} instance which this class exposes.
	 */

	showGrilleWindow(view, rowIndex, colIndex, item, e, record) {
		const config = {
			xtype: 'prototypeWindow',
			title: 'Salaires de base',
			maxWidth: 400,
			maxHeight: 450,
			items: [
				{
					xtype: 'salaireBasePanel',
					params: record,
				},
			],
		};
		
		Ext.create(config);
	},

	onSalaireBasePanelCancelClick() {
		this.getView().up().close();
	},

	onSalaireBasePanelSaveClick(view) {
		const form = view.up('#salaireBasePanelFormId');

		const model = {
			infoRequest: 2,
			data: form.getValues(),
		};
		const saveOrUpdate = this.requestSaveOrUpdate('server-scripts/grille/SalaireBase.php', model);
		
		if (saveOrUpdate.request.request.result.responseText > 0) {
			/*const mainView = view.up('#adesMainContainer');
			
			mainView.down('#adesInformationsMId').fireEvent('click');*/
			view.up().close();
		}
	},

	/*
	 * @param {(column, rowIndex, checked, record, e)}
	 */
	confirmActifCnaps(column, rowIndex, checked, record, e) {
		const messageBox = Ext.create('Ext.window.MessageBox', {
			itemId: 'messageBoxCnapsChecked',
			buttons: [{
				text: 'Oui',
				handler() {
					// console.log(record);
					
				},
			}, {
				text: 'Non',
				handler: (btn) => {
					btn.up('#messageBoxCnapsChecked').close();
					this.getView().down('#cnapsGridId').getStore().load();
				},
			}],
		});
		
		if (checked) {
			messageBox.show({
				title: 'Confirmer l\'enregistrement',
				msg: 'Cette variable existe déjà. Voulez-vous la remplacer?',
				icon: Ext.MessageBox.WARNING,
			});	
		}
	},
});
