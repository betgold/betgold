import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './operadores.html';
// API
import { Operadores } from '../../../api/operadores/operadores.js';


class operadoresCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);
		this.helpers({
			operadores () {
				return Operadores.find();
			}
		});
	}
	save(){
		Operadores.insert(this.op);
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

