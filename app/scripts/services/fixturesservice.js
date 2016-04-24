'use strict';

/**
 * @ngdoc service
 * @name storeApp.products
 * @description
 * # products
 * Factory in the storeApp.
 */
angular.module('teamApp')
  .factory('fixturesService', ['$resource', function ($resource) {


    // Public API here
    return $resource('/fixtures', {

    },{
        get: {
            method: 'GET',
            isArray: true
        },
        getOne: {
            method: 'GET',
            params: {
                fixtureId: 'fixtureId'
            },
            url: '/fixtures/:fixtureId'
        },
        createFixture: {
            method: 'POST',
            url: '/create-fixture'
        },
        updateFixture: {
            method: 'PUT',
            url: '/update-fixture',
        },
        removeFixture: {
            method: 'DELETE',
            url: '/fixtures/:fixtureId'
        },
        updateSelection: {
            method: 'PUT',
            params: {
                fixtureId: 'fixtureId'
            },
            url: '/fixtures/:fixtureId/update-selection'
        },
        confirmSelection: {
            method: 'PUT',
            params: {
                fixtureId: 'fixtureId'
            },
            url: '/fixtures/:fixtureId/confirm-selection'
        }
    });
  }]);
