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

    $scope.updateSelection = function () {

        $scope.status = 'updating';

        fixturesService.updateSelection({
            fixtureId: $routeParams.fixtureId
        }, { selection: new Date() }, function(response) {

            console.log('selection update', response);
            $scope.fixture = response.fixture;
        });
    };

    $scope.getFixture();
}]);
