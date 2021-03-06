Ext.define('Gprh.ades.view.pages.ErrorBase', {
	extend: 'Ext.window.Window',

	requires: [
		'Gprh.ades.view.login.Login',
		'Ext.container.Container',
		'Ext.form.Label',
		'Ext.layout.container.VBox',
		'Ext.toolbar.Spacer',
	],

	controller: 'login',
	autoShow: true,
	cls: 'error-page-container',
	closable: false,
	title: 'Sorry! ERROR 404 = Invalid url.',
	titleAlign: 'center',
	maximized: true,
	modal: true,

	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center',
	},
});
