var Team = require('../models/team');

module.exports = function (app) {

    app.post('/create-team', function(req, res) {

        console.log('create team');
        var newTeam = new Team(req.body);
        newTeam.save(function (err, newTeam) {
            if(err){
                res.status(503, err);
            }
            res.status(200).send(newTeam);
        });
    });

    app.get('/teams/', function(req, res) {

        Team.find({}, function(err, fixtures) {

            if (err) {
                res.status(503).send(fixtures);
            }
            res.status(200).send(fixtures);
        });
    });

    app.get('/teams/:teamId', function(req, res) {

        console.log(req.params);

        Team.findOne({_id: req.params.teamId}, function(err, fixture) {

            if (err) {
                res.status(503).send(err);
            }

            console.log(fixture);

            res.status(200).send(fixture);
        });
    });

};