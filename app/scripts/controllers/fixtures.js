'use strict';

angular.module('teamApp')
  .controller('FixturesCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.name = 'Fixtures';
    console.log($scope.name);

    $scope.createFixture = function(form) {

        $http.post('/create-fixture').then(function (response) {
            console.log(response);

        }, function(response) {
            console.log('error', response);
        });
    };
  }]);
