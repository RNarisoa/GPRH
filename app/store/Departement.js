Ext.define('Gprh.ades.store.Departement', {
	extend: 'Ext.data.Store',
	
	storeId: 'departementsStore',
	alias: 'store.departementStore',
	
	fields: [
		'idDepartement',
		'nomDepartement',
		'abreviationDepartement',
	],
	proxy: {
		type: 'ajax',
		url: 'server-scripts/listes/Departements.php',
		reader: {
			type: 'json',
			rootProperty: 'data',
		},
	},
	autoLoad: true,
});
