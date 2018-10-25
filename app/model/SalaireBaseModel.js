Ext.define('Gprh.ades.model.SalaireBaseModel', {
	extend: 'Ext.data.Model',
	alias: 'SalaireBaseModel',
	fields: [
		'idLigneGrille',
		'idGroupe',
		'idCategorie',
		{ name: 'salaireBase3', type: 'float' },
		{ name: 'salaireBase4', type: 'float' },
		{ name: 'salaireBase5', type: 'float' },
		{ name: 'actifLigneGrille', type: 'bool' },
		{ name: 'datePriseEffetGrille', type: 'date', dateFormat: 'n/j/Y' },
	],
});
