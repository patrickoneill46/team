'use strict';

angular.module('teamApp')
  .controller('FixturesCtrl', [
    '$scope',
    'fixturesService',
    'teamService',
    function ($scope, fixturesService, teamService) {

    $scope.name = 'Fixtures';
    $scope.newFixture = {};
    $scope.CREATE_FIXTURE_STRING = 'Create Fixture';

    $scope.getFixtures = function () {

        fixturesService.get(function (response) {

            console.log('fixtures response', response);
            $scope.fixtures = response;
        }, function(error) {

            console.log(error);
        });
    };

    $scope.createFixture = function(form) {

        var teamName = $scope.teams.find(function(team) {
            return team._id === $scope.newFixture.teamId;
        }).teamName;

        fixturesService.createFixture({
            date: $scope.newFixture.date,
            kickoff: $scope.newFixture.kickoff,
            location: $scope.newFixture.location,
            mapsLink: $scope.newFixture.mapsLink,
            meetTime: $scope.newFixture.meetTime,
            opposition: $scope.newFixture.opposition,
            teamId: $scope.newFixture.teamId,
            teamName: teamName
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
