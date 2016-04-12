'use strict';

angular.module('teamApp')
  .controller('FixturesCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.name = 'Fixtures';
    console.log($scope.name);

    $http.get('/fixtures').then(function (response) {

        console.log('fixtures response', response);
        $scope.fixtures = response.data;
    }, function(error) {

        console.log(error);
    });

    $scope.createFixture = function(form) {

        $http.post('/create-fixture', {
            location: $scope.createFixtureLocation,
            date: $scope.createFixtureDate,
            kickoff: $scope.createFixtureKickoff,
            mapsLink: $scope.createFixtureMapsLink
        }).then(function (response) {
            console.log(response);

        }, function(response) {
            console.log('error', response);
        });
    };
  }]);
