'use strict';

/**
 * @ngdoc service
 * @name teamApp.team
 * @description
 * # teams
 * Factory in the teamApp.
 */
angular.module('teamApp')
  .factory('teamService', ['$resource', function ($resource) {


    // Public API here
    return $resource('/teams', {

    },{
        get: {
            method: 'GET',
            isArray: true
        },
        getOne: {
            method: 'GET',
            params: {
                fixtureId: 'teamId'
            },
            url: '/teams/:teamId'
        },
        createTeam: {
            method: 'POST',
            url: '/create-team'
        },
        updateTeam: {
            method: 'PUT',
            url: '/update-team'
        }
    });
  }]);
