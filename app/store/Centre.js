Ext.define('Gprh.ades.store.Centre', {
	extend: 'Ext.data.Store',
	
	storeId: 'centreStore',
	alias: 'store.centreStore',
	
	fields: [
		'idCentre',
		'abreviationCentre',
		'nomCentre',
		'adresseCentre',
	],
	proxy: {
		type: 'ajax',
		url: 'server-scripts/listes/Centres.php',
		reader: {
			type: 'json',
			rootProperty: 'data',
		},
	},
	autoLoad: true,
});
