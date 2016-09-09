import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './bancas.html';
import { Accounts } from 'meteor/accounts-base';
import { Bancas } from '../../../../api/bancas/bancas.js';

class bancasCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);

		this.helpers({
			bancas () {
				return Bancas.find();
			}
		});
	}
	save(){
		this.banca.creditoMax = parseFloat(this.banca.creditoMax);
		this.call('addBanca', this.banca, this.bancaAuth, (err, result) => {
			if (result) {
				var $toastContent = $('<span>Banca adicionada!</span>');
				Materialize.toast($toastContent, 5000);
				this.banca = {};
				this.bancaAuth = {};
				this.showForm = false;
			}else {
				var $toastContent = $('<span>Esse Usuário já esxiste, tente outro!</span>');
				Materialize.toast($toastContent, 5000);
			}
		});
	}
	delete(id){
		var r = confirm("Deseijar remover essa banca");
		if (r == true) {
			Bancas.remove({_id: id});
			var $toastContent = $('<span>Banca Removida!!</span>');
			Materialize.toast($toastContent, 5000);
		}

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


