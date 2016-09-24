import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './sidebar.html';
import { Bancas } from '../../../api/bancas/bancas.js';

class sidebarCtrl{
	constructor($scope,$reactive,$state,$rootScope){
		'ngInject';
		$reactive(this).attach($scope);
		this.init();
		this.state = $state;
		this.call('getUser', (err, result) => {
			if (result) {
				this.user = result;
				this.banca = Bancas.findOne({_id: this.user.bancaId});
				$rootScope.user = result;
				if (this.user.tipo != 'operador') {
					this.admin = true;
				}
				$('body').addClass('loaded');
			}else {
				this.state.go('login');
			}
		});
		Meteor.subscribe('bancaId');
	}
	init(){
		$('.collapsible').collapsible();
		$(".sidebar-collapse").sideNav();
		// $('.dropdown-button').dropdown();
	}
	sideNav(){
		// $(".button-collapse").sideNav();
	}
	logout(){
		Meteor.logout(function () {});
		this.state.go('login');
	}
}

const name = 'sidebar';

export default angular.module(name, [
	angularMeteor
	]).component(name, {
		templateUrl:template,
		controller: sidebarCtrl
	});
