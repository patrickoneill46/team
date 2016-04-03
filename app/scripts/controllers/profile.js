'use strict';

angular.module('teamApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.name = 'Profile';
    console.log($scope.name);
  });
