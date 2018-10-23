Ext.define('Gprh.ades.view.ades.structures.StructuresModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.structuresModel',

	requires: [
		'Ext.data.Store',
		'Ext.data.proxy.Memory',
		'Ext.data.field.Integer',
		'Ext.data.field.String',
		'Ext.data.field.Date',
		'Ext.data.field.Boolean',
		'Ext.data.reader.Json',
		'Gprh.ades.store.Centre',
		'Gprh.ades.store.Departements',
	],

	stores: {
		centreResults: {
			type: 'centreStore',
		},

		departementResults: {
			type: 'departementsStore',
		},
	},
});
