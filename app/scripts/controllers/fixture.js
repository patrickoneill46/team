'use strict';

angular.module('teamApp')
  .controller('FixtureCtrl', ['$scope', '$routeParams', 'fixturesService', function ($scope, $routeParams, fixturesService) {

    $scope.name = 'Fixture';
    $scope.updateFixture = false;

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

    $scope.toggleUpdateFixture = function() {

        $scope.updateFixtureModel = angular.copy($scope.fixture);
        $scope.updateFixtureModel.date = new Date($scope.updateFixtureModel.date);
        $scope.updateFixtureModel.kickoff = new Date($scope.updateFixtureModel.kickoff);
        $scope.updateFixture = true;
    };

    $scope.cancelUpdateFixture = function() {

        $scope.updateFixture = false;
        $scope.updateFixtureModel = null;
    };

    $scope.getFixture();
}]);
