Ext.define('Gprh.ades.store.NavigationTree', {
	extend: 'Ext.data.TreeStore',

	storeId: 'NavigationTree',

	fields: [{
		name: 'text',
	}],

	root: {
		expanded: true,
		children: [
			{
				text: 'ADES',
				iconCls: 'x-fa fa-home',
				viewType: 'adesMainContainer',
				routeId: 'ades', // routeId defaults to viewType
				leaf: true,
			},
			{
				text: 'Personnel',
				iconCls: 'x-fa fa-users',
				viewType: 'personnel',
				leaf: true,
			},
			{
				text: 'Contrats de travail',
				iconCls: 'x-fa fa-leanpub',
				viewType: 'contrats',
				leaf: true,
			},			
			{
				text: 'Salaire',
				iconCls: 'x-fa fa-eur',
				viewType: 'salaire',
				leaf: true,
			},
			{
				text: 'Eléments variables',
				iconCls: 'x-fa fa-cogs',
				expanded: false,
				selectable: false,
				children: [
					{
						text: 'Congés',
						iconCls: 'x-fa fa-calendar',
						viewType: 'conges',
						leaf: true,
					},
					{
						text: 'Absences',
						iconCls: 'x-fa fa-calendar-check-o',
						viewType: 'absences',
						leaf: true,
					},
					{
						text: 'Primes et indemnités',
						iconCls: 'x-fa fa-gift',
						viewType: 'primesIndemnites',
						leaf: true,
					},
					{
						text: 'Heures supplémentaires',
						iconCls: 'x-fa fa-clock-o',
						viewType: 'heuresSupplementaires',
						leaf: true,
					},
					{
						text: 'Avances',
						iconCls: 'x-fa fa-money',
						viewType: 'avances',
						leaf: true,
					},
					{
						text: 'Dépassements téléphoniques',
						iconCls: 'x-fa fa-tty',
						viewType: 'depassements',
						leaf: true,
					},
					{
						text: 'Frais médicaux',
						iconCls: 'x-fa fa-user-md',
						viewType: 'fraisMedicaux',
						leaf: true,
					},
					{
						text: 'Frais d\'hospitalisation',
						iconCls: 'x-fa fa-h-square',
						viewType: 'fraisHospitalisation',
						leaf: true,
					},
					{
						text: 'Frais de scolarité des enfants',
						iconCls: 'x-fa fa-university',
						viewType: 'scolarite',
						leaf: true,
					},
				],
			},
			{
				text: 'Solde de tout compte',
				iconCls: 'x-fa fa-chain-broken',
				viewType: 'sdtc',
				leaf: true,
			},
			{
				text: 'Rapports et statistiques',
				iconCls: 'x-fa fa-pie-chart',
				viewType: 'statistique',
				leaf: true,
			},
			{
				text: 'Simulations sur salaire',
				iconCls: 'x-fa fa-calculator',
				expanded: false,
				selectable: false,
				children: [
					{
						text: 'Simulation individuelle',
						iconCls: 'x-fa fa-user-plus',
						viewType: 'simulationIndividuelle',
						leaf: true,
					},
					{
						text: 'Augmentation massive',
						iconCls: 'x-fa fa-line-chart',
						viewType: 'augmentationMassive',
						leaf: true,
					},
					{
						text: 'Prévision annuelle',
						iconCls: 'x-fa fa-umbrella',
						viewType: 'previsionAnnuelle',
						leaf: true,
					},
				],
			},
			{
				text: 'Etats de paie',
				iconCls: 'x-fa fa-external-link',
				viewType: 'etatsPaie',
				leaf: true,
			},
		],
	},
});
