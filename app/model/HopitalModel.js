Ext.define('Gprh.ades.model.HopitalModel', {
	extend: 'Ext.data.Model',
	alias: 'HopitalModel',
	fields: [
		'idHopital',
		'idAdes',
		{ name: 'pourcentageEmployeHopital', type: 'float' },
		{ name: 'pourcentageEmployeurHopital', type: 'float' },
		{ name: 'datePriseEffetHopital', type: 'date', dateFormat: 'n/j/Y' },
		{ name: 'actifHopital', type: 'bool' },
	],
});
