'use strict';

/**
 * @ngdoc service
 * @name teamApp.team
 * @description
 * # player
 * Factory in the teamApp.
 */
angular.module('teamApp')
  .factory('playerService', ['$resource', function ($resource) {

    // Public API here
    return $resource('/players', {

    },{
        get: {
            method: 'GET',
        },
        getOne: {
            method: 'GET',
            params: {
                playerId: 'playerId'
            },
            url: '/players/:playerId'
        },
        add: {
            method: 'POST',
            url: '/add-player'
        },
        update: {
            method: 'PUT',
            params: {
                playerId: 'playerId'
            },
            url: '/players/:playerId'
        },
        remove: {
            method: 'DELETE',
            url: '/players/:playerId'
        }
    });
  }]);
