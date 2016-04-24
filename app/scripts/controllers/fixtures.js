'use strict';

angular.module('teamApp')
  .controller('FixturesCtrl', ['$scope', 'fixturesService', function ($scope, fixturesService) {

    $scope.name = 'Fixtures';

    $scope.getFixtures = function () {

        fixturesService.get(function (response) {

            console.log('fixtures response', response);
            $scope.fixtures = response;
        }, function(error) {

            console.log(error);
        });
    };

    $scope.createFixture = function(form) {

        fixturesService.createFixture({
            date: $scope.createFixtureDate,
            kickoff: $scope.createFixtureKickoff,
            location: $scope.createFixtureLocation,
            mapsLink: $scope.createFixtureMapsLink,
            meetTime: $scope.createFixtureMeetTime,
        }, function (response) {

            console.log(response);
            $scope.getFixtures();

        }, function(response) {
            console.log('error', response);
        });
    };

    $scope.getFixtures();
  }]);
