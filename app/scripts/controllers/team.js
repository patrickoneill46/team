'use strict';

angular.module('teamApp')
  .controller('TeamCtrl', [
    '$scope',
    '$routeParams',
    'playerService',
    'teamService',
     function ($scope, $routeParams, playerService, teamService) {

    $scope.getPlayers = function () {

        playerService.get(function (response) {
            console.log('players response', response);
            $scope.players = response;
        });
    };

    teamService.getOne({teamId: $routeParams.teamId}, function (response) {

        $scope.team = response.team;
        $scope.fixtures = response.fixtures;
        console.log($scope.team);
    }, function (error) {
    
        console.log(error);
    });
}]);
