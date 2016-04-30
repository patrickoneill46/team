'use strict';

angular.module('teamApp')
  .controller('FixtureCtrl', [
    '$scope',
    '$routeParams',
    'fixturesService',
    'playerService',
    'teamService',
    function ($scope, $routeParams, fixturesService, playerService, teamService) {

    $scope.name = 'Fixture';
    $scope.editMode = false;
    $scope.updateInProgress = false;
    $scope.fixture;
    $scope.players = [];
    $scope.selectedPlayers = [];
    $scope.teams = [];
    $scope.team;

    $scope.getFixture = function() {

        fixturesService.getOne({ fixtureId: $routeParams.fixtureId }, function(response) {
            console.log('service response', response);
            $scope.fixture = response.fixture;
            $scope.team = response.team;
        });
    }

    $scope.updateSelection = function () {

        $scope.status = 'updating';

        fixturesService.updateSelection({
            fixtureId: $routeParams.fixtureId
        }, { selection: new Date() }, function(response) {

            console.log('selection update', response);
            $scope.fixture = response.fixture;
        });
    };

    $scope.updateFixture = function () {

        $scope.updateInProgress = true;

        fixturesService.updateFixture({
            fixtureId: $scope.fixture._id
        }, {
            fixture: {
                date: $scope.updateFixtureModel.date,
                description: $scope.updateFixtureModel.description,
                kickoff: $scope.updateFixtureModel.kickoff,
                mapsLink: $scope.updateFixtureModel.mapsLink,
                meetTime: $scope.updateFixtureModel.meetTime,
                opposition: $scope.updateFixtureModel.opposition,
                teamId: $scope.updateFixtureModel.teamId,
                venue: $scope.updateFixtureModel.venue,
            }
        }, function (response) {

            console.log(response.fixture);
            $scope.fixture = response.fixture;
            $scope.team = response.team;
            $scope.updateInProgress = false;
            $scope.editMode = false;

        }, function (response) {

            $scope.updateInProgress = false;
            console.log('error updating fixture');
        });
    };

    $scope.toggleUpdateFixture = function() {

        $scope.updateFixtureModel = angular.copy($scope.fixture);
        $scope.updateFixtureModel.date = new Date($scope.updateFixtureModel.date);
        $scope.updateFixtureModel.kickoff = new Date($scope.updateFixtureModel.kickoff);
        $scope.editMode = true;
    };

    $scope.cancelUpdateFixture = function() {

        $scope.editMode = false;
        $scope.updateFixtureModel = null;
    };

    $scope.getPlayers = function() {

        playerService.get(function (response) {

            console.log(response);
            $scope.players = response.players;
        });
    };

    $scope.selectPlayer = function (player) {

        if ($scope.selectedPlayers.indexOf(player) === -1) {
            $scope.selectedPlayers.push(player);
        }
    };

    $scope.removePlayer = function (player) {
        $scope.selectedPlayers.splice($scope.selectedPlayers.indexOf(player), 1);
    };

    $scope.getTeams = function () {

        teamService.get(function (response) {
            $scope.teams = response;
        });
    };

    $scope.getPlayers();
    $scope.getFixture();
    $scope.getTeams();
}]);
