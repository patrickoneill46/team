module.exports = function (app, User) {

    app.post('/update-account', function(req, res) {

        User.findOne({'username': req.body.username}, function (err, foundUser) {

            if (err) {
                console.log('error updating', err);
                res.send(err);
            }

            console.log(req.body);

            User.findByIdAndUpdate(foundUser._id, {$set: req.body}, function (err, updatedUser) {

                if(err) {
                    console.log('error: ', err);
                }
                console.log('updated user', updatedUser);
                res.send('updated successfully');
            });
        });
    });

    app.get('/profile/:username', function(req, res) {

        console.log(req.params);
        User.findOne({'username': req.params.username}, function(err, foundUser) {

            if (err) {
                console.log('error finding user', err);
                res.status(500).send('error', err);
            }
            res.send(foundUser);
        });
    });


};