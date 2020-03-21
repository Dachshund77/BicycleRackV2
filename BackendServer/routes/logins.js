var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../configs/config')
var expres = require('express');
var router = expres.Router();
//var user = require('../models/user');

//User login (Assigning of token) as standard way
router.route('/') //TODO fix this copy pasted code
    .post(function (request, response) {
        try {
            //Init values
            bcrypt.genSalt()
            //validate model
            
            //decrypt

            //find in db








//OOOOOOOOOLD STUFF

            //Init values
            var newUser = new user(request.body);

            //model validation
            var validationError = newUser.validateSync();
            if (validationError) {
                response.status(400).json(validationError);
                return;
            }       

            //Insert in DB
            newUser.save(function (dbError) {
                if(dbError.code === 11000){
                    //name is already in db
                    response.status(409).json(dbError);
                    return;
                }
                else if (dbError) {        
                    //catch all clasue
                    response.status(500).json(dbError);
                    return;
                }
                else {
                    //success
                    response.status(201).json(newUser);
                    return;
                }
            });
        } catch (err) {
            //Shit hit the fan somehow
            response.status(500).json('Internal server error');
        }    
    });

module.exports = router;