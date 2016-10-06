import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './sidebar.ng.html';

class sidebarCtrl{
	constructor($scope,$reactive,$state,$rootScope){
		'ngInject';
		$reactive(this).attach($scope);
		this.init();
		this.state = $state;
		this.call('getUser', (err, result) => {
			if (result) {
				this.user = result;
				user = result;
				$rootScope.user = result;
				$('body').addClass('loaded');
			}else {
				this.state.go('login');
			}
		});
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

const name = 'sidebarAdmin';

export default angular.module(name, [
	angularMeteor
	]).component(name, {
		templateUrl:template,
		controller: sidebarCtrl
	});
