'use strict';

describe('Controller: ProfileCtrl', function () {

  beforeEach(module('teamApp'));

  var AboutCtrl,
    scope,
    $httpBackend,
    testUser;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('ProfileCtrl', {
      $scope: scope
    });
    testUser = {
        username: 'Test User',
        position: 'Flanker'
    };
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', /profile\/.*/)
      .respond(200, testUser);

    $httpBackend.whenRoute('GET', /views\/.*/)
        .respond(200, '');
  }));

  it('should attach a username to the scope', function () {
    assert.isString(scope.username);
    assert.equal(scope.username, 'admin3');
  });

  it('should fetch user profile from server', function(){

    $httpBackend.flush();
    chai.assert.equal(scope.username, testUser.username);
    chai.assert.equal(scope.position, testUser.position);
  });

});
