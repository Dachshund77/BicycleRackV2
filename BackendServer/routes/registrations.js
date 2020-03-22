var expres = require('express');
var router = expres.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');

//Standard registration
router.route('/')
    .post(function (request, response) {
        try {
            //Init values
            var newUser = new User(request.body);

            //model validation
            var validationError = newUser.validateSync();
            if (validationError) {
                response.status(400).json(validationError);
                return;
            }

            //assigning salt            
            var genSalt = bcrypt.genSaltSync(10);
            console.log('generated salt '+genSalt);
            
            newUser.salt = genSalt;
            newUser.password = bcrypt.hashSync(newUser.password,genSalt);

            //Insert in DB
            newUser.save(function (dbError) {
                if (dbError) {
                    if (dbError.code === 11000) {
                        //name is already in db
                        response.status(409).json(dbError);
                        return;
                    }
                    else {
                        //catch all clasue
                        response.status(500).json(dbError);
                        return;
                    }
                }
                else {
                    //success
                    response.status(201).json(newUser);
                    return;
                }
            });
        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);
            
            response.status(500).json('Internal server error');
        }
    });

module.exports = router;