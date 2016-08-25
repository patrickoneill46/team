'use strict';

angular.module('teamApp')
  .controller('FixturesCtrl', [
    '$scope',
    'fixturesService',
    'teamService',
    function ($scope, fixturesService, teamService) {

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

    $scope.getTeams = function () {
      teamService.get(function (response) {
        $scope.teams = response;
      });
    };

    $scope.removeFixture = function($event, fixture) {

      $event.preventDefault();
      fixturesService.removeFixture({
        fixtureId: fixture._id
      }, function (response) {
        $scope.fixtures.splice($scope.fixtures.indexOf(fixture), 1);
      });
    };

    $scope.getTeams();
    $scope.getFixtures();
  }]);
