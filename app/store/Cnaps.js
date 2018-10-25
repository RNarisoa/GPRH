Ext.define('Gprh.ades.store.Cnaps', {
	extend: 'Ext.data.Store',
	
	storeId: 'cnapsStore',
	alias: 'store.cnapsStore',
	
	fields: [
		'idCnaps',
		'idAdes',
		'plafondCnaps',
		'pourcentageEmployeCnaps',
		'pourcentageEmployeurCnaps',
		'datePriseEffetCnaps',
		'actifCnaps',
	],
	proxy: {
		type: 'ajax',
		url: 'server-scripts/listes/Cnaps.php',
		reader: {
			type: 'json',
			rootProperty: 'data',
		},
	},
	autoLoad: true,
});
