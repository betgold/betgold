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
		this.subscribe('bancasAll');
		this.ed = false;
		this.helpers({
			bancas () {
				return Bancas.find();
			}
		});
	}
	save(){
		this.banca.creditoMax = parseFloat(this.banca.creditoMax);
		this.banca.ativo = true;
		this.banca.username = this.bancaAuth.username;
		this.banca.password = this.bancaAuth.password;
		if (this.ed) {
			var banca = angular.copy(this.banca);
			delete banca._id;
			Bancas.update(this.banca._id, {
				$set: banca,
			});
			this.ed = false;
			var $toastContent = $('<span>Banca editada!</span>');
			Materialize.toast($toastContent, 5000);
			this.showForm = false;
			this.banca = {};
		}else{
			this.call('addBanca', this.banca, this.bancaAuth, (err, result) => {
				if (result) {
					var $toastContent = $('<span>Banca adicionada!</span>');
					Materialize.toast($toastContent, 5000);
					this.showForm = false;
					this.banca = {};
				}else {
					var $toastContent = $('<span>Esse Usuário já esxiste, tente outro!</span>');
					Materialize.toast($toastContent, 5000);
				}
			});
		}
	}
	delete(banca){
		var r = confirm("Deseijar remover essa banca");
		if (r == true) {
			this.call('removeBanca', banca.adminId, (err, result) => {
				if (result) {
					Bancas.remove({_id: banca._id});
					var $toastContent = $('<span>Banca Removida!!</span>');
					Materialize.toast($toastContent, 5000);
				}
			});		
		}
	}
	edit (banca){
		this.banca = banca;
		this.showForm = true;
		this.ed = true;
		$('label').addClass('active');
	}
	status(banca){
		s = banca.ativo;
		Bancas.update({_id: banca._id},{
			$set: {ativo: banca.ativo}
		});
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


