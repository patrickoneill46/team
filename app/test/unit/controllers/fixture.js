describe('Fixture Controller', function() {

  beforeEach(module('teamApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

    it('name is Fixture', function() {

        var $scope = {};

        controller = $controller('FixtureCtrl', { $scope: $scope });

        chai.assert($scope.name === 'Fixture');
    });

});