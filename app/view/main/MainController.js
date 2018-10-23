/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
Ext.define('Gprh.ades.view.main.MainController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.main',

	requires: [
		'Gprh.ades.view.login.Login',
		'Gprh.ades.view.ades.AdesMainContainer',
	],

	listen: {
		controller: {
			'#': {
				unmatchedroute: 'onRouteChange',
			},
		},
	},

	routes: {
		':node': 'onRouteChange',
	},

	defaultToken: 'ades',

	onItemSelected(sender, record) {
		Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
	},

	onConfirm(choice) {
		if (choice === 'yes') {
			//
		}
	},

	onClickButton() {
		// Remove the localStorage key/value
		window.localStorage.removeItem('LoggedIn');

		// Remove Main View
		this.getView().destroy();
		window.location.href = '';
	},
	
	setCurrentView(hashTag) {
		const hasHTag = (hashTag || '').toLowerCase();

		const me = this;
		const refs = me.getReferences();
		const mainCard = refs.mainCardPanel;
		const mainLayout = mainCard.getLayout();
		const navigationList = refs.navigationTreeList;
		const store = navigationList.getStore();
		const node = store.findNode('routeId', hasHTag) || store.findNode('viewType', hasHTag);
		const view = (node && node.get('viewType')) || 'page404';
		const lastView = mainLayout.getActiveItem();
		const existingItem = mainCard.child(`component[routeId=${hasHTag}]`);
		let newView;

		// Kill any previously routed window
		if (lastView && lastView.isWindow) {
			lastView.destroy();
		}

		if (!existingItem) {
			newView = Ext.create({
				xtype: view,
				routeId: hashTag, // for existingItem search later
				hideMode: 'offsets',
			});
		}

		if (!newView || !newView.isWindow) {
			// !newView means we have an existing view, but if the newView isWindow
			// we don't add it to the card layout.
			if (existingItem) {
				// We don't have a newView, so activate the existing view.
				if (existingItem !== lastView) {
					mainLayout.setActiveItem(existingItem);
				}
				newView = existingItem;
			} else {
				// newView is set (did not exist already), so add it and make it the
				// activeItem.
				Ext.suspendLayouts();
				mainLayout.setActiveItem(mainCard.add(newView));
				Ext.resumeLayouts(true);
			}
		}

		navigationList.setSelection(node);

		if (newView.isFocusable(true)) {
			newView.focus();
		}

		me.lastView = newView;
	},

	onNavigationTreeSelectionChange(tree, node) {
		const to = node && (node.get('routeId') || node.get('viewType'));

		if (to) {
			this.redirectTo(to);
		}
	},

	onToggleNavigationSize() {
		const me = this;
		const refs = me.getReferences();
		const navigationList = refs.navigationTreeList;
		const wrapContainer = refs.mainContainerWrap;
		const collapsing = !navigationList.getMicro();
		const newWidth = collapsing ? 64 : 250;
		if (Ext.isIE9m || !Ext.os.is.Desktop) {
			Ext.suspendLayouts();

			refs.senchaLogo.setWidth(newWidth);

			navigationList.setWidth(newWidth);
			navigationList.setMicro(collapsing);

			Ext.resumeLayouts(); // do not flush the layout here...

			// No animation for IE9 or lower...
			wrapContainer.layout.animatePolicy = null;
			wrapContainer.layout.animate = null;
			wrapContainer.updateLayout(); // ... since this will flush them
		} else {
			if (!collapsing) {
				// If we are leaving micro mode (expanding), we do that first so that the
				// text of the items in the navlist will be revealed by the animation.
				navigationList.setMicro(false);
			}
			navigationList.canMeasure = false;

			// Start this layout first since it does not require a layout
			refs.senchaLogo.animate({
				dynamic: true,
				to: {
					width: newWidth,
				},
			});

			// Directly adjust the width config and then run the main wrap container layout
			// as the root layout (it and its chidren). This will cause the adjusted size to
			// be flushed to the element and animate to that new size.
			navigationList.width = newWidth;
			wrapContainer.updateLayout({
				isRoot: true,
			});
			navigationList.el.addCls('nav-tree-animating');

			// We need to switch to micro mode on the navlist *after* the animation (this
			// allows the "sweep" to leave the item text in place until it is no longer
			// visible.
			if (collapsing) {
				navigationList.on({
					afterlayoutanimation() {
						navigationList.setMicro(true);
						navigationList.el.removeCls('nav-tree-animating');
						navigationList.canMeasure = true;
					},
					single: true,
				});
			}
		}
	},

	onMainViewRender() {
		if (!window.location.hash) {
			this.redirectTo('dashboard');
		}
	},

	onRouteChange(id) {
		this.setCurrentView(id);
	},

	onSearchRouteChange() {
		this.setCurrentView('searchresults');
	},
});
