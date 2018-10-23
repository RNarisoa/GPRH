Ext.define('Gprh.ades.store.AdesInformations', {
	extend: 'Ext.data.Store',
	alias: 'store.adesInformationsStore',
	
	fields: ['ID_ADES', 'RAISON_SOCIALE', 'ADRESSE_COMPLETE', 'NIF', 'STAT', 'TELEPHONE', 'DESCRIPTION_ADES', 'SITE_WEB'],
	proxy: {
		type: 'ajax',
		url: 'server-scripts/ades/Ades.php',
		method: 'POST',
		extraParams: {
			infoRequest: '1',
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
		},
	},
	autoLoad: true,

	loadOnAppStart: true,
});
