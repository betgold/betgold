import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './jogos.html';

import { Jogos } from '../../../api/jogos/jogos.js';
import { Bancas } from '../../../api/bancas/bancas.js';

class jogosCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);
		this.showForm = false;
		this.ed       = false;
		this.campeonatos = [{desc: 'camp1'},{desc: 'camp1'},{desc: 'camp1'}];
		this.init();
		this.call('getUser', (err, result) => {
			if (result) {
				this.user = result;
				user = result;
			}else {
				this.state.go('login');
			}
		});
		this.helpers({
			jogos () {
				return Jogos.find();
			}
		});
	}
	init (){
		$('select').material_select();
	}
	addJogo (){
		if (this.ed) {
			var jogo = angular.copy(this.jogo);
			delete jogo._id;
			Jogos.update(this.jogo._id, {
				$set: jogo,
			});
			this.ed = false;
		}else {
			this.jogo.bancaId = user.bancaId;
			Jogos.insert(this.jogo);
		}
		this.showForm = false;
		this.jogo = {};
	}
	view (jogo){
		$('#modal').openModal();
		this.jogoV = jogo;
	}
	edit (jg){
		// this.jogo = jg;
		// this.showForm = true;
		// this.ed = true;
		// $('label').addClass('active');
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


