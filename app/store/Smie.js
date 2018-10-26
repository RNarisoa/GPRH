Ext.define('Gprh.ades.store.Smie', {
	extend: 'Ext.data.Store',
	
	storeId: 'smieStore',
	alias: 'store.smieStore',
	
	fields: [
		'idSmie',
		'nomSmie',
		'plafondSmie',
		'deductionEmploye',
		'deductionEmployeur',
		'coutExcedentaire',
		'franchiseCoutExcendentaire',
		'datePriseEffetSmie',
		'actifSmie',
	],
	proxy: {
		type: 'ajax',
		url: 'server-scripts/listes/Smie.php',
		reader: {
			type: 'json',
			rootProperty: 'data',
		},
	},
	autoLoad: true,
});
