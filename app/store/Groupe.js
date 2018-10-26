Ext.define('Gprh.ades.store.Groupe', {
	extend: 'Ext.data.Store',
	
	storeId: 'groupeStore',
	alias: 'store.groupeStore',
	
	fields: [
		'idGroupeCategorie',
		'nomGroupe',
	],
	proxy: {
		type: 'ajax',
		url: 'server-scripts/listes/Groupe.php',
		reader: {
			type: 'json',
			rootProperty: 'data',
		},
	},
	autoLoad: true,
});
