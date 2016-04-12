'use strict';

var chai = require('chai'),
    utils = require('../utils/database'),
    Fixture = require('../../app/models/fixture');

var invalidFixture,
    newFixture;

describe('Users: models', function () {

    beforeEach(function () {

        newFixture = {
            location: "Regent's Park",
            date: new Date(),
            kickoff: new Date(),
            description: "some description",
            mapsLink: "www.googlemaps.com",
            squad: {}
        };
    });

 describe('#create()', function () {

   it('should create a new Fixture', function (done) {

     Fixture.create(newFixture, function (err, createdFixture) {

       console.log('created user', err, createdFixture);
       chai.assert.isNull(err);
       chai.assert.equal(newFixture.location, createdFixture.location);
       chai.assert.equal(newFixture.description, createdFixture.description);
       done();
     });
   });

   it('should validate the required fields are present', function(done) {

    Fixture.create({}, function(err) {
        chai.assert.equal(err.errors['location'].message, 'Path `location` is required.');
        chai.assert.equal(err.errors['date'].message, 'Path `date` is required.');
        done();
    });
   });

  });

});