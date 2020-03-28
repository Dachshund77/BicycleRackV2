var expres = require('express');
var router = expres.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');
var isValidModel = require('../middleware/is-valid-model');

//Standard registration
router.post('/', [
    isValidModel(User)
]);
router.route('/')
    .post(function (req, res) {
        try {
            //Init values
            var newUser = new User(req.body);

            //generate password
            newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));

            //ALWAYS starts with the User role
            newUser.set({ 'role': 'User' })

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

module.exports = router;