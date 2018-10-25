Ext.define('Gprh.ades.view.ades.grille.GrilleModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.grilleModel',

	requires: [
		'Gprh.ades.store.Groupe',
		'Gprh.ades.store.Categorie',
	],

	stores: {
		groupeResults: {
			type: 'groupeStore',
		},

		categorieResults: {
			type: 'categorieStore',
		},
	},
});
