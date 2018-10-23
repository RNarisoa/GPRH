Ext.define('Gprh.ades.view.ades.AdesInformations', {
	extend: 'Ext.Panel',
	xtype: 'adesInformations',

	cls: 'userProfile-container',

	requires: [
		'Ext.ux.layout.ResponsiveColumn',
		'Gprh.ades.view.ades.AdesDescription',
		'Gprh.ades.view.ades.AdesLogo',
		'Gprh.ades.store.AdesInformations',
	],

	mixins: [
		'Gprh.ades.util.RequestCapable',
	],

	layout: 'responsivecolumn',

	initComponent() {
		const model = {
			infoRequest: 1,
		};
		const search = this.requestSearch('server-scripts/ades/Ades.php', model);

		this.items = [
			{
				// Use 50% of container when viewport is big enough, 100% otherwise
				xtype: 'adesLogo',
				data: search.res,
				userCls: 'big-50 small-100 shadow',
			},
			{
				xtype: 'adesDescription',
				data: search.res,
				userCls: 'big-50 small-100 shadow',
			},		
		];

		this.callParent();
	},
});
