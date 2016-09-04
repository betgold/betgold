import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './importJogos.html';

class importJogosCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);
	}
	sendData(){
		var table = $('#table')[0].files[0];
		var reader = new FileReader();
		table =reader.readAsArrayBuffer(table);
		console.log(table);
		var teste = '2';
		this.call('convert', table, (err,result) => {
			this.jogos = result;
		});
		console.log(this.jogos[10]);
	}
}

const name = 'importJogos';

export default angular.module(name, [
	angularMeteor,
	uiRouter
	]).component(name, {
		templateUrl:template,
		controller: importJogosCtrl
	}).config(config);

	function config($stateProvider) {
		'ngInject';
		$stateProvider
		.state('home.importJogos', {
			url: '/importe',
			template: '<import-jogos></import-jogos>'
		});
	}


