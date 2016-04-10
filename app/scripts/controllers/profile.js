'use strict';

angular.module('teamApp')
  .controller('ProfileCtrl',['$scope', '$http', function ($scope, $http) {

    $scope.username = 'admin3';
    $scope.position;

    $scope.positions = [
        'Loosehead', 'Hooker', 'Tighthead', 'Second row', 'Back row', 'Scrum half',
        'Out half', 'Centre', 'Wing', 'Fullback'
    ];

    $scope.secondaryPositions = {
        looshead: false,
        hooker: false,
        tighthead: false,
        secondRow: false,
        backRow: false,
        scrumHalf: false,
        outHalf: false,
        centre: false,
        wing: false,
        fullback: false
    };

    $http.get('/profile/' + $scope.username).then(function(response){

        console.log(response);

        $scope.username = response.data.username;
        $scope.position = response.data.position;
    });

    $scope.submitForm = function(form) {

        $http.post('update-account', {
            username: $scope.username,
            position: $scope.position,
            secondaryPositions: $scope.secondaryPositions
        }, function(response) {
            console.log(response);
        });
    };
  }]);
