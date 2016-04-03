'use strict';

var chai = require('chai'),
    utils = require('../utils/database'),
    User = require('../../app/models/user');

describe('Users: models', function () {

 describe('#create()', function () {
   it('should create a new User', function (done) {

     var newUser = {
        username: 'oneillp',
        password: '1234'
     };

     User.create(newUser, function (err, createdUser) {

       console.log('created user', err, createdUser);
       chai.assert.isNull(err);
       chai.assert.equal(newUser.username, createdUser.username);
       chai.assert.equal(newUser.password, createdUser.password);
       done();
     });
   });
 });

});