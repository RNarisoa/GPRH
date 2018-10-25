Ext.define('Gprh.ades.store.Hopital', {
	extend: 'Ext.data.Store',
	
	storeId: 'hopitalStore',
	alias: 'store.hopitalStore',
	
	fields: [
		'idHopital',
		'idAdes',
		'pourcentageEmployeHopital',
		'pourcentageEmployeurHopital',
		'datePriseEffetHopital',
		'actifHopital',
	],
	proxy: {
		type: 'ajax',
		url: 'server-scripts/listes/Hopital.php',
		reader: {
			type: 'json',
			rootProperty: 'data',
		},
	},
	autoLoad: true,
});
