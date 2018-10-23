/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 */
Ext.define('Gprh.ades.view.main.Main', {
	extend: 'Ext.container.Viewport',
	xtype: 'app-main',

	requires: [
		'Ext.window.MessageBox',
		'Ext.button.Segmented',
		'Ext.list.Tree',

		'Gprh.ades.view.main.MainController',
		'Gprh.ades.view.main.MainModel',
		'Gprh.ades.view.main.MainContainerWrap',
	],

	controller: 'main',
	viewModel: 'main',

	cls: 'sencha-dash-viewport',
	itemId: 'mainView',

	layout: {
		type: 'vbox',
		align: 'stretch',
	},

	items: [
		{
			xtype: 'toolbar',
			cls: 'sencha-dash-dash-headerbar shadow',
			height: 64,
			itemId: 'headerBar',
			items: [
				{
					xtype: 'component',
					reference: 'senchaLogo',
					cls: 'sencha-logo',
					html: '<div class="main-logo"><img src="resources/images/icons/cloud-icon.png">ADES</div>',
					width: 250,
				},
				{
					margin: '0 0 0 8',
					ui: 'header',
					iconCls: 'x-fa fa-navicon',
					id: 'main-navigation-btn',
					handler: 'onToggleNavigationSize',
				},
				'->',
				{
					xtype: 'segmentedbutton',
					margin: '0 16 0 0',

					platformConfig: {
						ie9m: {
							hidden: true,
						},
					},

					items: [{
						iconCls: 'x-fa fa-power-off',
						pressed: false,
						tooltip: 'Se déconnecter',
						handler: 'onClickButton',
					}],
				},
				{
					iconCls: 'flag-icon flag-icon-fr',
					ui: 'header',
					href: '#searchresults',
					hrefTarget: '_self',
					tooltip: 'Français',
				},
				{
					iconCls: 'flag-icon flag-icon-gb',
					ui: 'header',
					href: '#searchresults',
					hrefTarget: '_self',
					tooltip: 'English',
				},
				{
					iconCls: 'flag-icon flag-icon-de',
					ui: 'header',
					href: '#searchresults',
					hrefTarget: '_self',
					tooltip: 'Dutch',
				},
				{
					xtype: 'tbtext',
					text: window.localStorage.getItem('nomUtilisateur'),
					cls: 'top-user-name',
				},
				{
					xtype: 'image',
					cls: 'header-right-profile-image',
					height: 35,
					width: 35,
					alt: 'current user image',
					src: `resources/images/user-profile/${window.localStorage.getItem('avatar')}`,
				},
			],
		},
		{
			xtype: 'maincontainerwrap',
			id: 'main-view-detail-wrap',
			reference: 'mainContainerWrap',
			flex: 1,
			items: [
				{
					xtype: 'treelist',
					reference: 'navigationTreeList',
					itemId: 'navigationTreeList',
					ui: 'navigation',
					store: 'NavigationTree',
					width: 250,
					expanderFirst: false,
					expanderOnly: false,
					listeners: {
						selectionchange: 'onNavigationTreeSelectionChange',
					},
				},
				{
					xtype: 'container',
					flex: 1,
					reference: 'mainCardPanel',
					cls: 'sencha-dash-right-main-container',
					itemId: 'contentPanel',
					layout: {
						type: 'card',
						anchor: '100%',
					},
				},
			],
		},
	],
});
