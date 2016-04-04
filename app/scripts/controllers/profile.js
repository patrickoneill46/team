'use strict';

angular.module('teamApp')
  .controller('ProfileCtrl',['$scope', '$http', function ($scope, $http) {

    $scope.username = 'admin3';

    $scope.positions = [
        'Loosehead', 'Hooker', 'Tighthead', 'Second row', 'Back row', 'Scrum half',
        'Out half', 'Centre', 'Wing', 'Fullback'
    ];

    $scope.secondaryPositions = [];

    $http.get('/profile/' + $scope.username).then(function(response){

        console.log(response);

        $scope.username = response.data.username;
        $scope.position = response.data.position;
    });

    $scope.submitForm = function(form) {

        $http.post('update-account', {
            username: $scope.username,
            position: $scope.positions,
            secondaryPositions: $scope.secondaryPositions
        }, function(response) {
            console.log(response);
        });
    };
  }]);
