var expres = require('express');
var router = expres.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../configs/config');
var isAutenticated = require('../middleware/is-autenticated');
var isAuthorized = require('../middleware/is-authorized');

//Update a User
router.put('/', [
    isAutenticated,
    isAuthorized(['Admin', 'Owner'])
]);
router.route('/')
    .put(async function (req, res) {
        try {

            //Require authentication

            //Require Authorisation

            //Validate model

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