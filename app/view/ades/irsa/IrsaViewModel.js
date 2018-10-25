Ext.define('Gprh.ades.view.ades.irsa.IrsaViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.irsaViewModel',

	requires: [
		'Gprh.ades.store.Irsa',
	],

	stores: {
		irsaResults: {
			type: 'irsaStore',
		},
	},
});
