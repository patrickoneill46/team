var Fixture = require('../models/fixture');

module.exports = function (app) {

    app.post('/create-fixture', function(req, res) {

        console.log('create fixture');
        var newFixture = new Fixture(req.body);
        newFixture.save(function (err, newFixture) {
            if(err){
                res.status(503, err);
            }
            res.status(200).send(newFixture);
        });
    });

    app.get('/fixtures/', function(req, res) {

        Fixture.find({}, function(err, fixtures) {

            if (err) {
                res.status(503).send(fixtures);
            }
            res.status(200).send(fixtures);
        });
    });

    app.get('/fixture/:fixtureId', function(req, res) {

        console.log(req.params);

        Fixture.findOne({ _id: req.params.fixtureId }, function(err, fixture) {

            if (err) {
                res.status(503).send(err);
            }

            res.status(200).send(fixture);
        });
    });

};