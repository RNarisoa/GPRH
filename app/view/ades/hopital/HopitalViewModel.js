Ext.define('Gprh.ades.view.ades.hopital.HopitalViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.hopitalViewModel',

	requires: [
		'Gprh.ades.store.Hopital',
	],

	stores: {
		hopitalResults: {
			type: 'hopitalStore',
		},
	},
});
