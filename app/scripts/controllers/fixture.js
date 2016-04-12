'use strict';

angular.module('teamApp')
  .controller('FixtureCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.name = 'Fixture';
    console.log($routeParams);
    $http.get('fixture/' + $routeParams.fixtureId).then(function (response) {

        $scope.fixture = response.data;
        console.log($scope.fixture);
    }, function (error) {

        console.log(error);
    });
}]);
