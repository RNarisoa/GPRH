/**
 * This helper class manages the instantiation of {@link Gprh.ades.util.EcoNotification} objects,
 * preventing conflicts when two or more notifications are demanded in a narrow time interval.
 *
 * @see Gprh.ades.util.EcoNotification
 *
 *     @example
 *     Gprh.ades.util.Helper.showSuccess('HelloWorld');
 *
 */
Ext.define('Gprh.ades.util.Helper', {

	singleton: true,

	requires: [
		'Gprh.ades.util.EcoNotification',
	],

	/**
	 * @property {Boolean} locked flag to lock/prevent a second instance if there is an instance in DOM.
	 * @private
	 */
	locked: false,

	/**
	 * @property {Gprh.ades.util.EcoNotification} notificationInstance internal placeholder for the unique
	 * {@link Gprh.ades.util.EcoNotification} instance which this class exposes.
	 * @private
	 */
	notificationInstance: null,

	/** @inheritdoc */
	initComponent() {
		this.callParent();
	},

	/**
	 * Ensures there is exactly one instance of ecoNotificationPlacerHolder in the DOM, and tells if it
	 * is available for use. If another, unlocked notification instance was found, it will be destroyed.
	 * @return {Boolean} true if a notification bus was found and is available.
	 * @throws Error
	 * @private
	 */
	msgBusAvailable() {
		let available = false;

		if (!this.locked) {
			if (this.notificationInstance) {
				this.notificationInstance.destroy(true);
			}

			if (document.getElementById('ecoNotificationPlacerHolder') === null) {
				throw new Error('No dom with id="ecoNotificationPlacerHolder" found for the ecoNotification system. You should add '
				+ 'a div with id="ecoNotificationPlacerHolder" as a notification placeholder, for example in header.tag file.');
			} else {
				this.notificationInstance = Ext.create('Gprh.ades.util.EcoNotification', {

					renderTo: 'ecoNotificationPlacerHolder',
					listeners: {
						scope: this,
						msgSending: () => {
							this.locked = true;
						},
						msgSent: () => {
							this.locked = false;
							this.notificationInstance.el.slideOut('t', {
								duration: 1000,
							});
						},
					},
				});

				available = true;
			}
		}

		return available;
	},

	/**
 	 * Shows an error notification.
 	 * @param {String} text message to show.
	 * @return {undefined}
 	 * @public
 	 */
	showError(text) {
		if (this.msgBusAvailable()) {
			this.notificationInstance.showError(text);
		}
	},

	/**
 	 * Shows a success notification.
 	 * @param {String} text message to show.
	 * @return {undefined}
 	 * @public
 	 */
	showSuccess(text) {
		if (this.msgBusAvailable()) {
			this.notificationInstance.showSuccess(text);
		}
	},

	/**
	 * Shows an information notification.
	 * @param {String} text message to show.
	 * @return {undefined}
	 * @public
	 */
	showInfo(text) {
		if (this.msgBusAvailable()) {
			this.notificationInstance.showInfo(text);
		}
	},

	/**
	 * Shows a generic, standard notification.
	 * @param {String} text message to show.
	 * @return {undefined}
	 * @public
	 */
	showStandard(text) {
		if (this.msgBusAvailable()) {
			this.notificationInstance.showStandard(text);
		}
	},
});
