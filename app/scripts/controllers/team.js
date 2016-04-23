'use strict';

angular.module('teamApp')
  .controller('TeamCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    console.log($routeParams);
    $http.get('teams/' + $routeParams.teamId).then(function (response) {

        $scope.team = response.data;
        console.log($scope.team);
    }, function (error) {

        console.log(error);
    });
}]);
