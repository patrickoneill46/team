'use strict';

angular.module('teamApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.name = 'Profile';
    $scope.username = 'Patrick';
    $scope.primaryPosition = 'Back row';
    $scope.positions = ['Loosehead', 'Hooker', 'Tighthead', 'Second row', 'Back row', 'Scrum half', 'Out half', 'Centre', 'Wing', 'Fullback'];
  });
