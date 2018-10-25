Ext.define('Gprh.ades.view.ades.cnaps.CnapsViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.cnapsViewModel',

	requires: [
		'Gprh.ades.store.Cnaps',
	],

	stores: {
		cnapsResults: {
			type: 'cnapsStore',
		},
	},
});
