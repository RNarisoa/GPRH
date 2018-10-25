Ext.define('Gprh.ades.view.ades.smie.SmieViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.smieViewModel',

	requires: [
		'Gprh.ades.store.Smie',
	],

	stores: {
		smieResults: {
			type: 'smieStore',
		},
	},
});
