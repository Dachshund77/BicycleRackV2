var expres = require('express');
var router = expres.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../configs/config');
var isAutenticated = require('../middleware/is-autenticated');
var isAuthorized = require('../middleware/is-authorized');
var isValidModel = require('../middleware/is-valid-model');
var authoriseOwner = require('../middleware/authorise-owner-user');

//Update a User
router.put('/', [
    isAutenticated,
    authoriseOwner,
    isAuthorized(['Admin']),
    isValidModel(User)
]);
router.route('/')
    .put(async function (req, res) {
        try {
            //init 
            var clientUser = req.body;

            //fetch from db
            var dbUser;
            if (typeof res.locals.dbUserChache === 'undefined') {
                dbUser = await User.findOne({ name: req.body.name })
                if (dbUser == null) {
                    //User not found in db
                    res.status(404).json(dbUser);
                    return;
                }
                res.locals.dbUserChache = dbUser;
            } else {
                dbUser = res.locals.dbUserChache;
            }

            //NEVER allow users to rewrite their role
            if (dbUser.role == 'User') {
                clientUser.role = 'User';
            }

            //Update in db
            var updatedUser = await User.findOneAndUpdate({ name: clientUser.name }, req.body, { new: true })
            if (updatedUser == null) {
                //User not found in db
                res.status(404).json(updatedUser);
                return;
            }

            //respond
            res.status(200).json(updatedUser);

        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);
            res.status(500).json('Internal server error');
        }
    });

//Delete users by ID
router.delete('/', [
    isAutenticated,
    authoriseOwner,
    isAuthorized(['Admin']),
    isValidModel(User)
]);
router.route('/:name')
    .delete(function (request, response) {
        response.status(501);
        return;
    });

router.route('/:name')
    .get(function (request, response) {
        response.status(501);
        return;
    });

router.route('/:name?') //filtering with a lot of parameters?
    .get(function (request, response) {
        response.status(501);
        return;
    });


module.exports = router;