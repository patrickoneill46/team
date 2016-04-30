'use strict';

angular.module('teamApp')
  .controller('ProfileCtrl',['$scope', '$http', 'rugbyEnum', function ($scope, $http, rugbyEnum) {

    $scope.username = 'admin3';
    $scope.position;

    $scope.positions = rugbyEnum.POSITIONS_ENUM;

    $scope.secondaryPositions = rugbyEnum.POSITIONS_ENUM.map(function(position) {
        position.selected = false;
        return position;
    });

    $scope.phoneNumber;

    $http.get('/profile/' + $scope.username).then(function(response){

        console.log(response);

        $scope.username = response.data.username;
        $scope.position = response.data.position;
        $scope.phoneNumber = response.data.phoneNumber;
        $scope.firstName = response.data.firstName;
        $scope.lastName = response.data.lastName;

        response.data.secondaryPositions.forEach(function(position, index) {
            $scope.secondaryPositions[index].selected = position.selected;
        });
    });

    $scope.submitForm = function(form) {

        $http.post('update-account', {
            username: $scope.username,
            position: $scope.position,
            secondaryPositions: $scope.secondaryPositions.map(function(position) {return {id: position.id, selected: position.selected}}),
            phoneNumber: $scope.phoneNumber,
            firstName: $scope.firstName,
            lastName: $scope.lastName
        }, function(response) {
            console.log(response);
        });
    };
  }]);
