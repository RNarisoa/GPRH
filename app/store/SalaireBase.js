Ext.define('Gprh.ades.store.SalaireBase', {
	extend: 'Ext.data.Store',
	
	storeId: 'salaireBaseStore',
	alias: 'store.salaireBaseStore',
	
	fields: [
		'idLigneGrille',
		'idGroupe',
		'idCategorie',
		'salaireBaseMinimum',
		'salaireBase3',
		'salaireBase4',
		'salaireBase5',
		'actifLigneGrille',
		'datePriseEffetGrille',
		'nomGroupe',
		'categorieProfessionnelle',
	],
	proxy: {
		type: 'ajax',
		url: 'server-scripts/listes/SalaireBase.php',
		reader: {
			type: 'json',
			rootProperty: 'data',
		},
	},
	autoLoad: true,
});
