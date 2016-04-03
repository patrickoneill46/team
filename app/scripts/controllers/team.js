'use strict';


angular.module('teamApp')
  .controller('TeamCtrl', function ($scope) {
    $scope.name = 'Team';
    console.log($scope.name);
  });
