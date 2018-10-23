Ext.define('Gprh.ades.view.login.Login', {
	extend: 'Ext.window.Window',
	xtype: 'login',

	requires: [
		'Gprh.ades.view.login.LoginController',
	],
	
	shadow: 'sides',

	controller: 'login',
	bodyPadding: 10,
	title: 'Se connecter',
	closable: false,
	autoShow: true,
	items: {
		xtype: 'form',
		reference: 'form',
		items: [{
			xtype: 'textfield',
			name: 'nomUtilisateur',
			itemId: 'nomUtilisateurId',
			fieldLabel: 'Nom utilisateur',
			allowBlank: false,
		}, {
			xtype: 'textfield',
			name: 'motDePasse',
			itemId: 'motDePasseId',
			inputType: 'password',
			fieldLabel: 'Mot de passe',
			allowBlank: false,
		}, {
			xtype: 'combobox',
			name: 'centre',
			itemId: 'centreId',
			fieldLabel: 'Centre',			
			store: 'centreStore',
			queryMode: 'local',
			displayField: 'nomCentre',
			valueField: 'abreviationCentre',
			renderTo: Ext.getBody(),
			allowBlank: false, 
			forceSelection: true,
			editable: false,
		}, {
			xtype: 'button',
			ui: 'soft-green',
			margin: '10 0 0 0',
			align: 'right',
			iconAlign: 'right',
			iconCls: 'x-fa fa-angle-right',
			text: 'Se connecter',
			formBind: true,
			listeners: {
				click: 'onLoginClick',
			},
		}],
	},
});
