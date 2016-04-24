'use strict';

angular.module('teamApp')
  .controller('TeamCtrl', [
    '$scope',
    '$routeParams',
    'playerService',
    'teamsService',
     function ($scope, $routeParams, playerService, teamsService) {

    $scope.getPlayers = function () {

        playerService.get(function (response) {
            console.log('players response', response);
            $scope.players = response;
        });
    };

    teamsService.getOne({teamId: routeParams.teamId}, function (response) {

        $scope.team = response;
        console.log($scope.team);
    }, function (error) {
    
        console.log(error);
    });
}]);
