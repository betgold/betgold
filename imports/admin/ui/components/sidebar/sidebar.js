import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './sidebar.html';

class sidebarCtrl{
	constructor($scope,$reactive,$state){
		'ngInject';
		$reactive(this).attach($scope);
		this.init();
		this.state = $state;
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