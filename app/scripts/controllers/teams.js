'use strict';

angular.module('teamApp')
  .controller('TeamsCtrl', ['$scope', 'teamsService', 'playerService', function ($scope, teamService, playerService) {

    $scope.name = 'Team';
    $scope.players = [];

    $scope.createTeam = function (teamForm) {

        teamService.createTeam({
            teamName: $scope.createTeamName,
            teamCaptain: $scope.createTeamDescription
        }, function (response) {
            console.log(response);

            $scope.getTeams();

        }, function(response) {
            console.log('error', response);
        });

    };

    $scope.getTeams = function () {

        teamService.get(function (response) {

            console.log('teams response', response);
            $scope.teams = response;
        }, function(error) {

            console.log(error);
        });
    };

    $scope.getTeams();
    $scope.getPlayers();
}]);
