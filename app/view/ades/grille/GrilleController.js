Ext.define('Gprh.ades.view.ades.grille.GrilleController', {
	extend: 'Ext.app.ViewController',

	requires: [
		'Gprh.ades.view.pages.PrototypeWindow',
		'Gprh.ades.view.ades.grille.SalaireBasePanel',
	],

	mixins: [
		'Gprh.ades.util.RequestCapable',
	],

	alias: 'controller.grilleController',

	setCurrentView(view, params) {
		console.log(55);
		const cfg = Ext.apply({
			xtype: 'prototypeWindow',
			items: [
				Ext.apply({
					xtype: view,
				}, params.targetCfg),
			],
		}, params.windowCfg);

		Ext.create(cfg);
	},

	/*
	 * Create a new form to fill all wadges for the given categorie
	 * @param {object} view the Tab panel view
	 * @param {int} rowIndex selected rowIndex
	 * @param {int} colIndex selected colIndex
	 * @param {object} item all items config where the event was handled
	 * @param {object} e the event
	 * @param {object} record selected row data
	 * @param {object} dom element for the row selected
	 * 
	 * @return {object} {@link Gprh.ades.grille.SalaireBase} instance which this class exposes.
	 */

	showGrilleWindow(view, rowIndex, colIndex, item, e, record, row) {
		// console.log(6, record.get('categorieProfessionnelle'));
		/* this.setCurrentView('salaireBasePanel', {
			openWindow: true, // Let the controller know that we want this component in the window,
			targetCfg: {
				// put any extra configs for your view here
			},
			windowCfg: {
				// Any configs that you would like to apply for window popup goes here
				title: 'Compose Message',
			},
		}); */
		console.log(view);
		this.setCurrentView('salaireBasePanel');
	},
});
