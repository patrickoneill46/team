'use strict';

var chai = require('chai'),
    utils = require('../utils/database'),
    playerData = require('../../data/players'),
    User = require('../../app/models/user');

var secondaryPositions,
    invalidUser,
    newUser;

describe('Users: models', function () {

    beforeEach(function () {

        secondaryPositions = {
            looshead: false,
            hooker: false,
            tighthead: false,
            secondRow: false,
            backRow: false,
            scrumHalf: false,
            outHalf: false,
            centre: false,
            wing: false,
            fullback: false
        };

        newUser = {
            username: 'oneillp',
            password: '1234abc',
            position: 'OPENSIDE_FLANKER',
            secondaryPositions: secondaryPositions
        };

        invalidUser = {
            username: '1234',
            password: 'asdsada',
            position: 'Goalkeeper'
        };
    });

 describe('#create()', function () {
 
   it('should create a new User', function (done) {

     User.create(newUser, function (err, createdUser) {

       chai.assert.isNull(err);
       chai.assert.equal(newUser.username, createdUser.username);
       chai.assert.equal(newUser.password, createdUser.password);
       done();
     });
   });

   it('should validate the required fields are present', function(done) {

    User.create({}, function(err) {
        chai.assert.equal(err.errors['username'].message, 'Path `username` is required.');
        chai.assert.equal(err.errors['password'].message, 'Path `password` is required.');
        done();
    });
   });

   it('should validate fields have the correct data', function(done) {


    User.create(invalidUser, function(err) {
        chai.assert.isDefined(err.errors['username'].message);
        chai.assert.isDefined(err.errors['password'].message);
        chai.assert.equal(err.errors['position'].message,
            '`' + invalidUser.position + '` is not a valid enum value for path `position`.');
        done();
    })
   });

   it('should create a profile for each valid position', function(done) {

    var count = 0, numPlayers = playerData.length;

    playerData.forEach(function(player, index) {
        User.create(player, function(err, createdUser){
           chai.assert.isNull(err);
           if (++count === numPlayers) {
             done();
           }
        });
    });
   });
 });

});