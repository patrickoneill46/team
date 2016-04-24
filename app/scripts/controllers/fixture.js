'use strict';

angular.module('teamApp')
  .controller('FixtureCtrl', ['$scope', '$routeParams', 'fixturesService', function ($scope, $routeParams, fixturesService) {

    $scope.name = 'Fixture';
    $scope.editMode = false;
    $scope.updateInProgress = false;

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

    $scope.updateFixture = function () {

        $scope.updateInProgress = true;

        fixturesService.updateFixture({
            fixtureId: $scope.fixture._id
        }, {
            fixture: {
                date: $scope.updateFixtureModel.date,
                kickoff: $scope.updateFixtureModel.kickoff,
                meetTime: $scope.updateFixtureModel.meetTime,
                venue: $scope.updateFixtureModel.venue,
                mapsLink: $scope.updateFixtureModel.mapsLink,
                description: $scope.updateFixtureModel.description
            }
        }, function (response) {

            console.log(response.fixture);
            $scope.fixture = response.fixture;
            $scope.updateInProgress = false;
            $scope.editMode = false;
        }, function (response) {

            $scope.updateInProgress = false;
            console.log('error updating fixture');
        });
    };

    $scope.toggleUpdateFixture = function() {

        $scope.updateFixtureModel = angular.copy($scope.fixture);
        $scope.updateFixtureModel.date = new Date($scope.updateFixtureModel.date);
        $scope.updateFixtureModel.kickoff = new Date($scope.updateFixtureModel.kickoff);
        $scope.editMode = true;
    };

    $scope.cancelUpdateFixture = function() {

        $scope.editMode = false;
        $scope.updateFixtureModel = null;
    };

    $scope.getFixture();
}]);
