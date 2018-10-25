Ext.define('Gprh.ades.model.CnapsModel', {
	extend: 'Ext.data.Model',
	alias: 'CnapsModel',
	fields: [
		'idCnaps',
		'idAdes',
		{ name: 'plafondCnaps', type: 'float' },
		{ name: 'pourcentageEmployeCnaps', type: 'float' },
		{ name: 'pourcentageEmployeurCnaps', type: 'float' },
		{ name: 'datePriseEffetCnaps', type: 'date', dateFormat: 'n/j/Y' },
		{ name: 'actifCnaps', type: 'bool' },
	],
});
