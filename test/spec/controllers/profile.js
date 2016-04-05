'use strict';

describe('Controller: ProfileCtrl', function () {

  beforeEach(module('teamApp'));

  var AboutCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('ProfileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a username to the scope', function () {
    assert.isString(scope.username);
    assert.equal(scope.username, 'admin3');
  });
});
