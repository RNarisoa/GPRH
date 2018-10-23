Ext.define('Gprh.ades.view.ades.AdesDescription', {
	extend: 'Ext.panel.Panel',
	xtype: 'adesDescription',

	requires: [
		'Ext.Button',
		'Ext.Container',
	],
	
	layout: {
		type: 'vbox',
		align: 'left',
	},

	cls: 'timeline-items-wrap user-profile-desc',

	height: 400,

	bodyPadding: 20,

	initComponent() {
		const results = this.initialConfig.data;
		this.items = [
			{
				xtype: 'component',
				baseCls: 'box x-fa fa-home',
				html: results.RAISON_SOCIALE,
				padding: '0 0 12 0',
			},
			{
				xtype: 'component',
				baseCls: 'box x-fa fa-road',
				html: results.ADRESSE_COMPLETE,
				padding: '0 0 12 0',
			},
			{
				xtype: 'component',
				baseCls: 'box x-fa  fa-balance-scale',
				html: `${results.NIF} - ${results.STAT}`,
				padding: '0 0 12 0',
			},
			{
				xtype: 'component',
				baseCls: 'box x-fa fa-phone',
				html: results.TELEPHONE,
				padding: '0 0 12 0',
			},
			{
				xtype: 'component',
				baseCls: 'box x-fa fa-globe',
				html: `<a href="${results.SITE_WEB}" target="blank">${results.SITE_WEB}</a>`,
				padding: '0 0 12 0',
			},
			{
				xtype: 'container',
				flex: 1,
				cls: 'about-me-wrap',
				maxWidth: 300,
				html: `<h3 class="x-fa fa-archive">A propos</h3><p>${results.DESCRIPTION_ADES}</p>`,
			},
			{
				xtype: 'toolbar',
				ui: 'plain',
				layout: {
					type: 'hbox',
					pack: 'middle',
				},
				minWidth: 300,
				userCls: 'profiledescription-social-toolbar',
				padding: '8 0 8 0',
				items: [
					{
						xtype: 'component',
						cls: 'large-icon icon-padding',
						baseCls: 'x-fa fa-users',
						padding: '8 0 8 0',
					},
					{
						xtype: 'container',
						layout: {
							type: 'vbox',
							align: 'center',
							pack: 'center',
						},
						items: [
							{
								xtype: 'component',
								cls: 'likes-value',
								html: results.EFFECTIF_PERSONNEL,
							},
							{
								xtype: 'component',
								cls: 'likes-label',
								html: 'Employés',
							},
						],
					},
					'->',
					{
						xtype: 'component',
						cls: 'large-icon icon-padding',
						baseCls: 'x-fa fa-sitemap',
						padding: '8 0 8 0',
					},
					{
						xtype: 'container',
						layout: {
							type: 'vbox',
							align: 'center',
							pack: 'center',
						},
						items: [
							{
								xtype: 'component',
								cls: 'friends-value',
								html: results.EFFECTIF_CENTRE,
							},
							{
								xtype: 'component',
								cls: 'friends-label',
								html: 'Centres',
							},
						],
					},
				],
			},
		];

		this.callParent();
	},
});
