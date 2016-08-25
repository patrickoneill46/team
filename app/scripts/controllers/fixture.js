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
    $scope.selectedPlayer;
    $scope.revertDragged = 'invalid';
    $scope.selectionChanged = false;

    function getPlayerIndex(squad, squadPlayer) {
      var selectedIndex = -1;
      squad.find(function(player, index) {

        if (squadPlayer._id === player._id) {
          selectedIndex = index;
        }
      });
      return selectedIndex;
    };

    $scope.getFixture = function() {

        fixturesService.getOne({ fixtureId: $routeParams.fixtureId }, function(response) {
            console.log('service response', response);
            $scope.fixture = response.fixture;
            $scope.team = response.team;
            if (response.fixture.squad) {
              $scope.selectedPlayers = response.fixture.squad;
            }
        });
    }

    $scope.updateSelection = function () {

      if ($scope.selectionChanged) {

        $scope.status = 'updating';

        fixturesService.updateSelection({
          fixtureId: $routeParams.fixtureId,
        }, { selection: $scope.selectedPlayers }, function(response) {

          $scope.selectionChanged = false;
          $scope.fixture = response.fixture;
        });
      }
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
        $scope.updateFixtureModel.squad = angular.copy($scope.selectedPlayers);
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

    $scope.onSelectedPlayerDragged = function(player) {
      $scope.selectedPlayer = player;
    };

    $scope.onPlayerDroppedIntoSquad = function(e) {

      if (getPlayerIndex($scope.selectedPlayers, $scope.selectedPlayer) === -1) {
        $scope.selectedPlayers.push($scope.selectedPlayer);
        $scope.selectionChanged = true;
      }
      $scope.players[getPlayerIndex($scope.players, $scope.selectedPlayer)].selected = true;
      $scope.selectedPlayer = null;
      angular.element(e.target).removeClass('playerOverSquad');
    };

    $scope.onPlayerDragged = function (player) {
      $scope.selectedPlayer = player;
    };

    $scope.onPlayerOverSquad = function (e) {
      angular.element(e.target).addClass('playerOverSquad');
    };

    $scope.onPlayerOutOfSquad = function (e) {
      angular.element(e.target).removeClass('playerOverSquad');
    };

    $scope.onSelectedPlayerOverList = function (e) {
      angular.element(e.target).addClass('playerOverList');
    };

    $scope.onSelectedPlayerOutOfList = function (e) {
      angular.element(e.target).removeClass('playerOverList');
    };

    $scope.onSelectedPlayerDroppedIntoList = function (e) {

      var selectedPlayerIndex = getPlayerIndex($scope.selectedPlayers, $scope.selectedPlayer);
      if (selectedPlayerIndex !== -1) {
        $scope.players[getPlayerIndex($scope.players, $scope.selectedPlayer)].selected = false;
        $scope.selectedPlayers.splice(selectedPlayerIndex, 1);
        $scope.selectionChanged = true;
      }
      $scope.onSelectedPlayerOutOfList(e);
    };

    $scope.getPlayers();
    $scope.getFixture();
    $scope.getTeams();
}]);
