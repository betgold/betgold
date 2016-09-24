import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './importJogos.html';
import { Jogos } from '../../../api/jogos/jogos.js';
class importJogosCtrl{
	constructor($scope,$reactive){
		'ngInject';
		$reactive(this).attach($scope);
		this.helpers({
			jogos () {
				return Jogos.find();
			}
		});
	}
	sendData(){
		// var file = $('#table')[0].files[0];
		// if (!file) return;

  //   	var reader = new FileReader(); //create a reader according to HTML5 File API

  //   	reader.onload = function(event){          
  //     		var buffer = new Uint8Array(reader.result) // convert to binary
  //     		Meteor.call('convert', buffer);
 	//  	}	

  //   	reader.readAsArrayBuffer(file); 
    //read the file as arraybuffer
		var teste = '2';
		this.call('convert', teste, (err,result) => {
			for (var i = 0; result.length ; i++) {
				Jogos.remove({bancaId: Meteor.user().bancaId});
				result[i].bancaId = Meteor.user().bancaId;
				Jogos.insert(result[i]);
			}
		});
	}
	delete (id){
		Jogos.remove({_id: id});
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


