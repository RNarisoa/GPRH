Ext.define('Gprh.ades.view.pages.PrototypeWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.prototypeWindow',
	autoShow: true,
	modal: true,

	layout: 'fit',

	width: 200,
	height: 200,

	afterRender() {
		const me = this;

		me.callParent();

		me.syncSize();

		// Since we want to always be a %age of the viewport, we have to watch for
		// resize events.
		Ext.on(me.resizeListeners = {
			resize: me.onViewportResize,
			scope: me,
			buffer: 50,
		});
	},

	doDestroy() {
		Ext.un(this.resizeListeners);

		this.callParent();
	},

	onViewportResize() {
		this.syncSize();
	},

	syncSize() {
		const width = Ext.Element.getViewportWidth();

            
		const height = Ext.Element.getViewportHeight();

		// We use percentage sizes so we'll never overflow the screen (potentially
		// clipping buttons and locking the user in to the dialog).

		this.setSize(Math.floor(width * 0.9), Math.floor(height * 0.9));
		this.setXY([Math.floor(width * 0.05), Math.floor(height * 0.05)]);
	},
});
