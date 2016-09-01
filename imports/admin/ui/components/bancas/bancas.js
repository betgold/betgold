import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './bancas.html';

class bancasCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);
	}
}

const name = 'bancas';

export default angular.module(name, [
	angularMeteor,
	uiRouter
	]).component(name, {
		templateUrl:template,
		controller: bancasCtrl
	}).config(config);

	function config($stateProvider) {
		'ngInject';
		$stateProvider
		.state('admin.bancas', {
			url: '/bancas',
			template: '<bancas></bancas>'
		});
	}


