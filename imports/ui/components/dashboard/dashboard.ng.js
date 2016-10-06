import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './dashboard.ng.html';

class dashboardCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);

		this.call('getApostasInfo', (err, result) => {
			this.info = result;
		});
	}
}

const name = 'dashboard';

export default angular.module(name, [
	angularMeteor,
	uiRouter
	]).component(name, {
		templateUrl:template,
		controller: dashboardCtrl
	}).config(config);

	function config($stateProvider) {
		'ngInject';
		$stateProvider
		.state('home.dashboard', {
			url: '/dashboard',
			template: '<dashboard></dashboard>'
		});
	}


