/**
 * **Implementation**
 *
 * In app.js, include the class Gprh.ades.util.Helper.
 *
 * **ATTENTION** : Use Helper class {@link Gprh.ades.util.Helper} to use notification instead of use it directly
 */
Ext.define('Gprh.ades.util.EcoNotification', {

	extend: 'Ext.Component',

	alias: 'widget.dismissalert',

	childEls: [
		'btnEl', 'alertTextEl', 'alertEl',
	],

	/** @inheritdoc */
	renderTpl: ''.concat(
		'<div class="alertbox">',
		'<div id="{id}-alertEl" class="alert {alertCls}">' +
		'<button id="{id}-btnEl" class="close">&times;</button>' +
		'<span id="{id}-alertTextEl">{text}</span>' +
		'</div>',
		'</div>'
	),

	/** @inheritdoc */
	beforeRender() {
		const me = this;
		Ext.applyIf(me.renderData, {
			text: me.text || '&#160;',
			alertCls: me.alertCls || '',
		});
	},

	/** @inheritdoc */
	onRender() {
		const delay = 4000;
		this.callParent();

		const btn = this.btnEl;

		this.mon(btn, 'click', this.onClick, this);

		this.el.slideIn('t', {
			duration: 500,
		});

		this.fireEvent('msgSending', this);

		setTimeout(() => {
			this.fireEvent('msgSent', this);
		}, delay);
	},

	/**
	 * Called when the user clicks the notification.
	 * @param {Event} e the click event.
	 * @return {undefined}
	 * @private
	 */
	onClick(e) {
		if ((this.preventDefault || (this.disabled && this.getHref())) && e) {
			e.preventDefault();
		}
		if (e.button !== 0) {
			return;
		}
		if (!this.disabled) {
			this.hide();
		}
	},

	/** @inheritdoc */
	setText(text) {
		const me = this;
		me.text = text;
		if (me.rendered) {
			me.alertTextEl.update(text || '');
			me.updateLayout();
		}
	},

	/**
	 * Shows a notification box. Call {@link #showError}, {@link #showSucess},
	 * {@link #showInfo} or {@link #showStandard} instead.
	 * @param {String} text the text to display.
	 * @param {String} cls the CSS class to apply.
	 * @return {undefined}
	 * @private
	 */
	showAlertBox(text, cls) {
		const oldCls = this.alertCls;
		this.text = text;
		this.alertCls = cls;

		if (this.rendered) {
			Ext.suspendLayouts();
			this.alertEl.removeCls(oldCls);
			this.alertEl.addCls(cls);
			this.alertTextEl.update(text || '');
			if (this.hidden) {
				this.show();
			}
			Ext.resumeLayouts(true);
		}
	},


	/**
	 * Show an error message.
	 * @param {String} text The text to show.
	 * @return {undefined}
	 * @public
	 */
	showError(text) {
		this.showAlertBox(text, 'alert-error');
	},

	/**
	 * Show a success message.
	 * @param {String} text The text to show.
	 * @return {undefined}
	 * @public
	 */
	showSuccess(text) {
		this.showAlertBox(text, 'alert-success');
	},

	/**
	 * Show an info message.
	 * @param {String} text The text to show.
	 * @return {undefined}
	 * @public
	 */
	showInfo(text) {
		this.showAlertBox(text, 'alert-info');
	},

	/**
	 * Show a standard message.
	 * @param {String} text The text to show.
	 * @return {undefined}
	 * @public
	 */
	showStandard(text) {
		this.showAlertBox(text, '');
	},
});
