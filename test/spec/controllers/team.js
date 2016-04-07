'use strict';

describe('Controller: ProfileCtrl', function () {

  beforeEach(module('teamApp'));

  var AboutCtrl,
    scope,
    $httpBackend,
    players;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('TeamCtrl', {
      $scope: scope
    });
    players = [
        'Test Player 1', 'Test Player 2'
    ];
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'players')
      .respond(200, players);

    $httpBackend.whenRoute('GET', /views\/.*/)
        .respond(200, '');
  }));

  it('should load a list of players from the server', function () {
    $httpBackend.flush();
    assert.lengthOf(scope.players, players.length);
  });
});
