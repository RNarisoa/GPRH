Ext.define('Gprh.ades.view.ades.AdesLogo', {
	extend: 'Ext.panel.Panel',
	xtype: 'adesLogo',
	cls: 'userProfile-container',

	requires: [
		'Ext.Button',
		'Ext.Container',
	],

	layout: {
		type: 'vbox',
		align: 'middle',
	},

	height: 320,

	bodyPadding: 20,

	initComponent() {
		const results = this.initialConfig.data;
		this.items = [
			{
				xtype: 'image',
				cls: 'userProfilePic',
				height: 180,
				width: 180,
				alt: 'profile-picture',
				src: 'resources/images/user-profile/logo2.png',
			},
			{
				xtype: 'component',
				cls: 'userProfileName',
				height: '',
				html: 'La cuisine solaire',
			},
			{
				xtype: 'component',
				cls: 'userProfileDesc',
				html: 'Association de Développement de l\'énergie Solaire',
			},
			{
				xtype: 'component',
				cls: 'userProfileDesc',
				html: 'Suisse - Madagascar',
			},
			{
				xtype: 'container',
				flex: 1,
				layout: {
					type: 'vbox',
					align: 'middle',
				},
				items: [
					{
						xtype: 'button',
						text: 'Editer',
						ui: 'soft-green',
						margin: '10 0 0 0',
						listeners: {
							click: 'onAdesInformationEditClick',
						},
						params: results,
					},
				],
			},
		];

		this.callParent();
	},
	
});
