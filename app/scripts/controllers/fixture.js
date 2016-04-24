'use strict';

angular.module('teamApp')
  .controller('FixtureCtrl', ['$scope', '$routeParams', 'fixturesService', function ($scope, $routeParams, fixturesService) {
    $scope.name = 'Fixture';

    $scope.getFixture = function() {

        fixturesService.getOne({ fixtureId: $routeParams.fixtureId }, function(response) {
            console.log('service response', response);
            $scope.fixture = response;
        });
    }

    $scope.getFixture();
}]);
