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
        }
    });
  }]);
