Ext.define('Gprh.ades.view.ades.structures.StructuresModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.structuresModel',

	requires: [
		'Gprh.ades.store.Centre',
		'Gprh.ades.store.Departement',
	],

	stores: {
		centreResults: {
			type: 'centreStore',
		},

		departementResults: {
			type: 'departementStore',
		},
	},
});
