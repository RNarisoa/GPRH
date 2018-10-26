Ext.define('Gprh.ades.model.IrsaModel', {
	extend: 'Ext.data.Model',
	alias: 'IrsaModel',
	fields: [
		'idIrsa',
		'idAdes',
		{ name: 'plafond', type: 'float' },
		{ name: 'pourcentageEmployeIrsa', type: 'float' },
		{ name: 'pourcentageEmployeurIrsa', type: 'float' },
		{ name: 'deductionEnfant', type: 'float' },
		{ name: 'datePriseEffetIrsa', type: 'date', dateFormat: 'n/j/Y' },
		{ name: 'actifIrsa', type: 'bool' },
	],
});
