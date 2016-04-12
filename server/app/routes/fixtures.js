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

};