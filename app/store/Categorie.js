Ext.define('Gprh.ades.store.Categorie', {
	extend: 'Ext.data.Store',
	
	storeId: 'categorieStore',
	alias: 'store.categorieStore',
	
	fields: [
		'idCategorie',
		'idGroupeCategorie',
		'categorieProfessionnelle',
		'descriptionCategorie',
		'nomGroupe',
		'nbSalaireBase',
	],
	proxy: {
		type: 'ajax',
		url: 'server-scripts/listes/Categorie.php',
		reader: {
			type: 'json',
			rootProperty: 'data',
		},
	},
	autoLoad: true,
});
