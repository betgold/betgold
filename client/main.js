import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import login from '../imports/ui/components/login/login';
import admin from '../imports/ui/components/admin/admin';
import sidebar from '../imports/ui/components/sidebar/sidebar';

import jogos from '../imports/ui/components/jogos/jogos';
import operadores from '../imports/ui/components/operadores/operadores';
import caixa from '../imports/ui/components/caixa/caixa';
import mapa from '../imports/ui/components/mapa/mapa';
import dashboard from '../imports/ui/components/dashboard/dashboard';

angular.module("app", [
	angularMeteor,
	uiRouter,
	login.name,
	admin.name,
	sidebar.name,
	jogos.name,
	operadores.name,
	caixa.name,
	mapa.name,
	dashboard.name,
	]).config(config);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';
 
  $locationProvider.html5Mode(true);
 
  $urlRouterProvider.otherwise('/login');
}