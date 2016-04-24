'use strict';

/**
 * @ngdoc overview
 * @name belsizeApp
 * @description
 * # belsizeApp
 *
 * Main module of the application.
 */
angular
  .module('teamApp', [
    'ngRoute',
    'ngResource'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/team', {
        templateUrl: 'views/teams.html',
        controller: 'TeamsCtrl'
      })
      .when('/team/:teamId', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl'
      })
      .when('/fixtures', {
        templateUrl: 'views/fixtures.html',
        controller: 'FixturesCtrl'
      })
      .when('/fixture/:fixtureId', {
        templateUrl: 'views/fixture.html',
        controller: 'FixtureCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
