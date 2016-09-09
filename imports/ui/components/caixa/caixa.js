import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './caixa.html';
import { Bancas } from '../../../api/bancas/bancas.js';


class caixaCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);
		this.helpers({
			banca () {
				return Bancas.findOne({userId: Meteor.userId()});
			},
			tipos (){
				return ["Entrada","Saida"]
			}
		});
	}
}

const name = 'caixa';

export default angular.module(name, [
	angularMeteor,
	uiRouter
	]).component(name, {
		templateUrl:template,
		controller: caixaCtrl
	}).config(config);

	function config($stateProvider) {
		'ngInject';
		$stateProvider
		.state('home.caixa', {
			url: '/caixa',
			template: '<caixa></caixa>'
		});
	}