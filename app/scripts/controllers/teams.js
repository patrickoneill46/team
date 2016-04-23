'use strict';

angular.module('teamApp')
  .controller('TeamsCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.name = 'Team';
    $scope.players = [];
    console.log($scope.name);
    $http.get('players').then(function(response) {
        console.log(response);
        $scope.players = response.data;
    });

    $scope.createTeam = function (teamForm) {

        $http.post('/create-team', {
            teamName: $scope.createTeamName,
            teamCaptain: $scope.createTeamDescription
        }).then(function (response) {
            console.log(response);

            $scope.getTeams();

        }, function(response) {
            console.log('error', response);
        });

    };

    $scope.getTeams = function () {

        $http.get('/teams').then(function (response) {

            console.log('teams response', response);
            $scope.teams = response.data;
        }, function(error) {

            console.log(error);
        });
    };

    $scope.getTeams();
}]);
