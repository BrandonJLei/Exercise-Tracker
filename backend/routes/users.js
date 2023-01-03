const router = require('express').Router();
let User = require('../models/user.model');

// first route endpoint that handles incoming http get requests
// {root}/users/
router.route('/').get((req, res) => {
        User.find() // mongoose method that gets a list of all the users from database
         .then(users => res.json(users))
         .catch(err => res.status(400).json('Error: ' + err));
});

// handles post requests
router.route('/add').post((req, res) => {
        const username = req.body.username;

        const newUser = new User({username});

        newUser.save()
         .then(() => res.json('User added!'))
         .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
