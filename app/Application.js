/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Gprh.ades.Application', {
	extend: 'Ext.app.Application',

	name: 'Gprh.ades',

	quickTips: false,
	platformConfig: {
		desktop: {
			quickTips: true,
		},
	},

	stores: [
		'NavigationTree',
		'Centre',
	],

	requires: [
		'Gprh.ades.view.pages.Error404Window',
	],

	launch() {
		// Check to see the current value of the localStorage key
		const loggedIn = window.localStorage.getItem('LoggedIn');

		// This ternary operator determines the value of the LoggedIn key.
		// If LoggedIn is false, we display the login window,
		// otherwise, we display the main view
		Ext.create({
			xtype: loggedIn ? 'app-main' : 'login',
		});
	},

	onAppUpdate() {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			(choice) => {
				if (choice === 'yes') {
					window.location.reload();
				}
			});
	},
});
