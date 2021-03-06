import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './home.ng.html';

class homeCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);
	}
}

const name = 'home';

export default angular.module(name, [
	angularMeteor,
	uiRouter
	]).component(name, {
		templateUrl:template,
		controller: homeCtrl
	}).config(config);

	function config($stateProvider) {
		'ngInject';
		$stateProvider
		.state('home', {
			url: '/home',
			template: '<home></home>'
		});
	}


