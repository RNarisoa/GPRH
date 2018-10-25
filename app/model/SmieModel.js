Ext.define('Gprh.ades.model.SmieModel', {
	extend: 'Ext.data.Model',
	alias: 'SmieModel',
	fields: [
		'idSmie',
		'nomSmie',
		{ name: 'plafond', type: 'float' },
		{ name: 'deductionEmploye', type: 'float' },
		{ name: 'deductionEmployeur', type: 'float' },
		{ name: 'coutExcedentaire', type: 'float' },
		{ name: 'franchiseCoutExcendentaire', type: 'float' },
		{ name: 'datePriseEffetSmie', type: 'date', dateFormat: 'n/j/Y' },
		{ name: 'actifSmie', type: 'bool' },
	],
});
