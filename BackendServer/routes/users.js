var expres = require('express');
var router = expres.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../configs/config');
var isAutenticated = require('../middleware/is-autenticated');
var isAuthorized = require('../middleware/is-authorized');
var isValidModel = require('../middleware/is-valid-model');
var isRecOwner = require('../middleware/is-rec-owner-users');

//Update a User
router.put('/', [
    isAutenticated,
    isRecOwner,
    isAuthorized(['Admin', 'Owner']),
    isValidModel(User)
]);
router.route('/')
    .put(async function (req, res) {
        try {

            //Update in db
            res.status(200).json(result); //Result is not defined
        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);
            res.status(500).json('Internal server error');
        }
    });

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