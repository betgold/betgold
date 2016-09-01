import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Accounts } from 'meteor/accounts-base';

import template from './login.html';

class loginCtrl{
	constructor($scope,$reactive, $state){
		'ngInject';
		$reactive(this).attach($scope);
		this.state = $state;
	}
	login(){
		Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
			this.$bindToContext((err) => {
				if (err) {
					console.log(err);
				} else {
					this.state.go('home');
				}
			})
			);
	}
	register(){
		Accounts.createUser(this.credentials,
			this.$bindToContext((err) => {
				if (err) {
					this.error = err;
				} else {
						// this.$state.go('produtos');
						console.log("ok");
					}
				})
			);
	}
}

const name = 'login';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	]).component(name, {
		templateUrl:template,
		controller: loginCtrl
	}).config(config);

	function config($stateProvider) {
		'ngInject';
		$stateProvider
		.state('login', {
			url: '/login',
			template: '<login></login>'
		});
	}

