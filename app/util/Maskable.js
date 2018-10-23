/**
 * Mixin to add a {@link Ext.LoadMask} to an {@link Ext.Component}, or to allow a data object
 * that is not a {@link Ext.Component} to display a {@link Ext.LoadMask} on the whole DOM body.
 *
 */
Ext.define('Gprh.ades.util.Maskable', {

	/**
	 * @property {Boolean} isMaskable allows third-parties to determine if this object is maskable.
	 * @public
	 * @readonly
	 */
	isMaskable: true,

	/**
	 * Shows a mask. If no mask had been shown before, a new {@link Ext.LoadMask}
	 * will be created and attached to this component.
	 * @param {String} message a message to display in the mask.
	 * @return {undefined}
	 * @public
	 */
	showMask(message) {
		const msg = message || 'Loading';
		const comp = this instanceof Ext.Component ? this : Ext.getCmp('viewport');
		if (this.ecojsLIBUtilComponentMask === undefined) {
			this.ecojsLIBUtilComponentMask = new Ext.LoadMask({
				msg,
				target: comp,
				listeners: {
					beforeshow: () => {
						const thisEl = comp.getEl();
						return (thisEl && thisEl.mask);
					},
				},
			});
		}

		this.ecojsLIBUtilComponentMask.msg = msg;

		// Check before show for ExtJS 4.2
		if (this.ecojsLIBUtilComponentMask) {
			this.ecojsLIBUtilComponentMask.show();
		}
	},

	/**
	 * Hides this component's loading mask.
	 * @return {undefined}
	 * @public
	 */
	hideMask() {
		if (this.getMask()) {
			this.getMask().hide();
		}
	},

	/**
	 * Gets this component's loading mask.
	 * @return {?Ext.LoadMask} the mask if it was created before, or null.
	 * @private
	 */
	getMask() {
		return this.ecojsLIBUtilComponentMask;
	},

});
