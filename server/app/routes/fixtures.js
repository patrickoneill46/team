var Fixture = require('../models/fixture'),
    Team = require('../models/team');

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

    app.get('/fixtures/:fixtureId', function(req, res) {

        console.log(req.params);

        Fixture.findOne({ _id: req.params.fixtureId }, function(err, fixture) {

            if (err) {
                res.status(503).send(err);
            }

            Team.findById(fixture.teamId, function(err, team) {

                if (err) {
                    res.status(503).send(err);
                }

                fixture.team = team;
                console.log('fixtureTeam', fixture.team);
                res.status(200).send({fixture: fixture, team: team});
            });
        });
    });

    app.put('/fixtures/:fixtureId', function (req, res) {

        console.log('updating fixture', req.body.fixture, req.body.fixtureId);

        Fixture.findByIdAndUpdate(req.params.fixtureId, {
            $set: req.body.fixture
        }, {
            new: true
        }, function (err, fixture) {

            console.log(fixture);

            if (err) {
                res.status(503).send(err);
            }
            Team.findById(fixture.teamId, function(err, team) {

                if (err) {
                    res.status(503).send(err);
                }

                fixture.team = team;
                console.log('fixtureTeam', fixture.team);
                res.status(200).send({fixture: fixture, team: team});
            });
        });
    });

    app.put('/fixtures/:fixtureId/update-selection', function(req, res) {

        Fixture.findByIdAndUpdate(req.params.fixtureId, {
            $set: {
                squad: req.body.selection
            }
        }, function(err, fixture){

            if(err){
                res.status(503).send(err);
            }

            res.status(200).send({
                status: 'updated',
                fixture: fixture
            });
        });
    });

    app.delete('/fixtures/:fixtureId', function(req, res) {

      Fixture.findByIdAndRemove(req.params.fixtureId, function(err, fixture) {

          if (err) {
            res.status(503).send(err);
          }
          res.status(200).send({
            status: 'deleted',
            fixture: fixture
          });
      });
    });
};
