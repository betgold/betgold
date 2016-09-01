import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import login from '../imports/ui/components/login/login';
import home from '../imports/ui/components/home/home';
import sidebar from '../imports/ui/components/sidebar/sidebar';

import jogos from '../imports/ui/components/jogos/jogos';
import operadores from '../imports/ui/components/operadores/operadores';
import caixa from '../imports/ui/components/caixa/caixa';
import mapa from '../imports/ui/components/mapa/mapa';
import dashboard from '../imports/ui/components/dashboard/dashboard';

// admin
import admin from '../imports/admin/ui/components/admin/admin';
import sidebarAdmin from '../imports/admin/ui/components/sidebar/sidebar';
import bancas from '../imports/admin/ui/components/bancas/bancas';

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
	bancas.name
	]).config(config);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';
 
  $locationProvider.html5Mode(true);
 
  $urlRouterProvider.otherwise('/login');
}