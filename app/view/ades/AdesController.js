Ext.define('Gprh.ades.view.ades.AdesController', {
	extend: 'Ext.app.ViewController',

	requires: [
		'Gprh.ades.view.ades.AdesInformationForm',
		'Gprh.ades.view.ades.structures.StructureMainContainer',
	],

	mixins: [
		'Gprh.ades.util.RequestCapable',
	],

	alias: 'controller.adesController',

	listeners: {
		saveClick() {
			this.onBackBtnClick();
		},
	},

	init() {
		this.setCurrentView('adesInformations');
	},

	onBackBtnClick() {
		this.setCurrentView('adesInformations');
	},

	onMenuClick(menu, item) {
		if (item && item.routeId === 'emailcompose') {
			this.setCurrentView(item.routeId, item.params);
		}
	},

	setCurrentView(view, params) {
		const contentPanel = this.getView().down('#contentPanel');

		// We skip rendering for the following scenarios:
		// * There is no contentPanel
		// * view xtype is not specified
		// * current view is the same
		if (!contentPanel || view === '' || (contentPanel.down() && contentPanel.down().xtype === view)) {
			return false;
		}

		if (params && params.openWindow) {
			const cfg = Ext.apply({
				xtype: 'emailwindow',
				items: [
					Ext.apply({
						xtype: view,
					}, params.targetCfg),
				],
			}, params.windowCfg);

			Ext.create(cfg);
		} else {
			Ext.suspendLayouts();

			contentPanel.removeAll(true);
			contentPanel.add(
				Ext.apply({
					xtype: view,
				}, params)
			);

			Ext.resumeLayouts(true);
		}
		return true;
	},

	onGridCellItemClick(view, td, cellIndex, record) {
		if (cellIndex > 1) {
			this.setCurrentView('emaildetails', { record });
		} else if (cellIndex === 1) {
			// Invert selection
			record.set('favorite', !record.get('favorite'));
		}
	},

	beforeDetailsRender(view) {
		const record = view.record ? view.record : {};

		view.down('#mailBody').setHtml(record.get('contents'));
		view.down('#attachments').setData(record.get('attachments'));
		view.down('#emailSubjectContainer').setData(record.data ? record.data : {});
		view.down('#userImage').setSrc(`resources/images/user-profile/${record.get('user_id')}.png`);
	},

	onAdesInformationEditClick(item) {
		this.setCurrentView('adesInformationForm', item.params);
	},

	onAdesInformationSaveClick(view, item) {
		const me = this;
		const form = view.up('form');

		const model = {
			infoRequest: 2,
			data: form.getValues(),
		};
		const saveOrUpdate = this.requestSaveOrUpdate('server-scripts/ades/Ades.php', model);
		
		if (saveOrUpdate.request.request.result.responseText > 0) {
			const mainView = me.getView().up('#adesMainContainer');
			
			mainView.down('#adesInformationsMId').fireEvent('click');
		}
	},

	onStructuresClick() {
		this.setCurrentView('structures');
	},
});
