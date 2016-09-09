import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './operadores.html';
// API
import { Bancas } from '../../../api/bancas/bancas.js';

class operadoresCtrl{
	constructor($scope,$reactive,$rootScope){
		'ngInject';
		$reactive(this).attach($scope);
		this.helpers({
			banca () {
				return Bancas.findOne({userId: Meteor.userId()});
			}
		});
	}
	save(){
		this.call('addOperador', this.op, this.login, (err, result) => {
			console.log(result);
			if (result) {
				var $toastContent = $('<span>Operador adicionada!</span>');
				Materialize.toast($toastContent, 5000);
				this.op = {};
				this.login = {};
				this.showForm = false;
			}else {
				var $toastContent = $('<span>Erro verifique os campos ou tente outro usuário!</span>');
				Materialize.toast($toastContent, 5000);
			}
		});
	}
	edit(op){
		this.showForm = true;
		this.op = op;
		$('label').addClass('active');
	}
	ok(){
		
	}
	delete(id){
		Operadores.remove({_id: id});
	}
}

const name = 'operadores';

export default angular.module(name, [
	angularMeteor,
	uiRouter
	]).component(name, {
		templateUrl:template,
		controller: operadoresCtrl
	}).config(config);


	function config($stateProvider) {
		'ngInject';
		$stateProvider
		.state('home.operadores', {
			url: '/operadores',
			template: '<operadores></operadores>'
		});
	}

