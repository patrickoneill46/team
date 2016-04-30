module.exports = function(app, User) {

    app.get('/players', function(req, res) {

        User.find({}, function(err, players) {

            if (err) {
                res.status(503).send(err);
            }

            res.status(200).send({players: players});
        });
    });
};