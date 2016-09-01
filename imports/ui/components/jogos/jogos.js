import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './jogos.html';

import { Jogos } from '../../../api/jogos/jogos.js';

class jogosCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);
		this.showForm = false;
		this.ed       = false;
		this.helpers({
			jogos () {
				return Jogos.find({});
			}
		});
	}
	addJogo (){
		if (this.ed) {
			Jogos.update({id_: this.jogo._id}, this.jogo);
		}else {
			Jogos.insert(this.jogo);
		}
		this.jogo = {};
	}
	view (jogo){

	}
	edit (jg){
		this.jogo = jg;
		this.showForm = true;
		this.ed = true;
	}
	delete (id){
		Jogos.remove({_id: id});
	}
}

const name = 'jogos';

export default angular.module(name, [
	angularMeteor,
	uiRouter
	]).component(name, {
		templateUrl:template,
		controller: jogosCtrl
	}).config(config);

	function config($stateProvider) {
		'ngInject';
		$stateProvider
		.state('home.jogos', {
			url: '/jogos',
			template: '<jogos></jogos>'
		});
	}


