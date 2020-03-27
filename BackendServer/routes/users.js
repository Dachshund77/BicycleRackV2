var expres = require('express');
var router = expres.Router();
var User = require('../models/user');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../configs/config')

//Update a User
router.route('/')
    .put(async function (request, response) {
        try {
            //Init 
            //var test1 = request.header.authorization;
            var auth = request.headers.authorization;
            //split away beared, need middle war for that 
            var array = auth.split(' ');
            var token = array[1];

            var key = config.secret;
            console.log("token " + token);
            console.log("key " + key);
            var result = jwt.verify(token, key)//Why the fuck do i even hav the salt stored in the db
            console.log("result " + result);
            console.log(result['name']);
            //result['name'];
            //Require authentication

            //Require Authorisation

            //Validate model

            //Update in db
            response.status(200).json(result);
        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);
            response.status(500).json('Internal server error');
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