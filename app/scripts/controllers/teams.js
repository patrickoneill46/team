'use strict';

angular.module('teamApp')
  .controller('TeamsCtrl', ['$scope', 'teamsService', function ($scope, teamService) {
  
    $scope.name = 'Team';
    $scope.players = [];
//    $http.get('players').then(function(response) {
//        console.log(response);
//        $scope.players = response.data;
//    });

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
            $scope.teams = response.data;
        }, function(error) {

            console.log(error);
        });
    };

    $scope.getTeams();
}]);
