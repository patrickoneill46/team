'use strict';

angular.module('teamApp')
  .controller('TeamCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.name = 'Team';
    $scope.players = [];
    console.log($scope.name);
    $http.get('players').then(function(response) {
        console.log(response);
        $scope.players = response.data;
    });
}]);
