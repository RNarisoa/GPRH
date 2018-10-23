Ext.define('Gprh.ades.store.Departements', {
	extend: 'Ext.data.Store',
	
	storeId: 'departementsStore',
	alias: 'store.departementsStore',
	
	fields: ['idDepartement', 'nomDepartement', 'abreviationDepartement'],
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
