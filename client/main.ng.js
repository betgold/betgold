import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import login from '../imports/ui/components/login/login.ng.js';
import home from '../imports/ui/components/home/home.ng.js';
import sidebar from '../imports/ui/components/sidebar/sidebar.ng.js';

import jogos from '../imports/ui/components/jogos/jogos.ng.js';
import operadores from '../imports/ui/components/operadores/operadores.ng.js';
import caixa from '../imports/ui/components/caixa/caixa.ng.js';
import mapa from '../imports/ui/components/mapa/mapa.ng.js';
import dashboard from '../imports/ui/components/dashboard/dashboard.ng.js';
import importJogos from '../imports/ui/components/importJogos/importJogos.ng.js';

// admin
import admin from '../imports/admin/ui/components/admin/admin.ng.js';
import sidebarAdmin from '../imports/admin/ui/components/sidebar/sidebar.ng.js';
import bancas from '../imports/admin/ui/components/bancas/bancas.ng.js';
 
angular.module("app", [
	angularMeteor,
	uiRouter,
	login.name,
	home.name,
	admin.name,
	sidebarAdmin.name,
	sidebar.name,
	jogos.name,
	operadores.name,
	caixa.name,
	mapa.name,
	dashboard.name,
	bancas.name,
	importJogos.name
	]).config(config);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';
 
  $locationProvider.html5Mode(true);
 
  $urlRouterProvider.otherwise('/login');
}