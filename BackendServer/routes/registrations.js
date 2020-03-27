var expres = require('express');
var router = expres.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');
//var middleware = require('../middleware/is-autenticated')

//Standard registration
//router.post('/', [middleware]);
router.route('/')
    .post(function (req, res) {
        try {
            //Init values
            var newUser = new User(req.body);

            //model validation
            var validationError = newUser.validateSync();
            if (validationError) {
                res.status(400).json(validationError);
                return;
            }

            //assigning salt            
            var genSalt = bcrypt.genSaltSync(10);
            console.log('generated salt ' + genSalt);

            newUser.salt = genSalt;
            newUser.password = bcrypt.hashSync(newUser.password, genSalt);

            //Insert in DB
            newUser.save(function (dbError) {
                if (dbError) {
                    if (dbError.code === 11000) {
                        //name is already in db
                        res.status(409).json(dbError);
                        return;
                    }
                    else {
                        //catch all clasue
                        res.status(500).json(dbError);
                        return;
                    }
                }
                else {
                    //success
                    res.status(201).json(newUser);
                    return;
                }
            });
        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);

            res.status(500).json('Internal server error');
        }
    });

router.route('/')
    .get(function (req, res) {
        try {
            res.status(200).json('WEIRDNESS!');
        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);

            res.status(500).json('Internal server error');
        }
    });

module.exports = router;