import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './admin.html';

class adminCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);
	}
}

const name = 'admin';

export default angular.module(name, [
	angularMeteor,
	uiRouter
	]).component(name, {
		templateUrl:template,
		controller: adminCtrl
	}).config(config);

	function config($stateProvider) {
		'ngInject';
		$stateProvider
		.state('home', {
			url: '/home',
			template: '<admin></admin>'
		});
	}


