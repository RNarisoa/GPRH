/*
 * This file contains all global variable and methods
 * In your *.js, include the class Gprh.ades.util.Globals.
 * Call Gprh.ades.util.Globals.getServerPath() or AppName.util.Globals.version throug your Classes
 */

Ext.define('Gprh.ades.util.Globals', {
	singleton: true,
	alternateClassName: 'globalUtilities',

	version: '1.0',
	config: {
		author: 'RAKOTOVAO Narisoa',
	},

	formatNumber: (target) => {
		Ext.util.Format.thousandSeparator = ' ';

		const formattedNumber = Ext.util.Format.number(target.getValue(), '0,000.00');
		target.setValue(formattedNumber);
	},

	formatRenderNumber: (valueToFormat) => {
		Ext.util.Format.thousandSeparator = ' ';
		return Ext.util.Format.number(valueToFormat, '0,000.00');
	},
	
	/*
	 * Set all configuration values to edit grid row
	 * @param 
	 */
	/**
	 * Set all configuration values to edit grid row when the user clicks Update or Cancel button.
	 * @param {string} url the proxy url to find data from server.
	 * @param {string} gridId the grid id to load after success result
	 * @return {object} this {@link Ext.grid.plugin.RowEditing}
	 * @private
	 */
	setRowEditingConfig(url, object) {
		return Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
			autoCancel: false,
			listeners: {
				validateedit: (editor, context) => {
					const model = {
						infoRequest: 2,
						data: context.newValues,
					};
					const saveOrUpdate = object.requestSaveOrUpdate(url, model);
					if (saveOrUpdate.request.responseText > 0) {
						context.grid.getStore().reload();
					}
				},
				canceledit: (editor, context) => {
					context.grid.getStore().reload();
				},
			},
		});
	},

	constructor(config) {
		this.initConfig(config);
	},
});
