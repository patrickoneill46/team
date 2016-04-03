'use strict';

angular.module('teamApp')
  .controller('MainCtrl', function ($scope) {
    $scope.name = 'Main';
    console.log($scope.name);
  });
