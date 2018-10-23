Ext.define('Gprh.ades.view.login.LoginController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.login',

	requires: [
		
	],

	onLoginClick(me) {
		// This would be the ideal location to verify the user's credentials via
		// a server-side lookup. We'll just move forward for the sake of this example.
		const form = me.up('window').down('form').getForm();
		if (form.isValid()) {
			form.submit({
				url: 'server-scripts/login/Login.php',
				method: 'POST',
				params: null, // needed for additional params
				success: (formulaire, action) => {
					// Set the localStorage value to true
					const data = Ext.JSON.decode(action.response.responseText);
					if (data.success) {
						window.localStorage.setItem('LoggedIn', true);
						window.localStorage.setItem('nomUtilisateur', data.nomUtilisateur);
						window.localStorage.setItem('avatar', data.avatar);
						// Remove Login Window
						this.getView().destroy();

						// Add the main view to the viewport
						Ext.create({
							xtype: 'app-main',
						});
					}
				},
				failure: () => {
					// Remove Login Window and show error window to redirect to the Login Window
					this.getView().destroy();
					Ext.Msg.show({
						title: 'Failure',
						message: 'User name or password incorrect! Please try again.',
						icon: Ext.MessageBox.INFO,
						buttons: Ext.MessageBox.OK,
						fn: () => {
							window.location.href = '';
						},
					});
				},
			});
		}
	},
});
