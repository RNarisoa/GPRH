Ext.define('Gprh.ades.store.Irsa', {
	extend: 'Ext.data.Store',
	
	storeId: 'irsaStore',
	alias: 'store.irsaStore',
	
	fields: [
		'idIrsa',
		'idAdes',
		'plafond',
		'pourcentageEmployeIrsa',
		'pourcentageEmployeurIrsa',
		'deductionEnfant',
		'datePriseEffetIrsa',
		'actifIrsa',
	],
	proxy: {
		type: 'ajax',
		url: 'server-scripts/listes/Irsa.php',
		reader: {
			type: 'json',
			rootProperty: 'data',
		},
	},
	autoLoad: true,
});
