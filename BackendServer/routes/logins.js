var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../configs/config')
var expres = require('express');
var router = expres.Router();
var User = require('../models/user');
var isValidModel = require('../middleware/is-valid-model');

//User login (Assigning of token) as standard way
router.post('/', [
    isValidModel(User)
]);
router.route('/')
    .post(async function (req, res) {
        try {
            //Init values 
            var clientUser = new User(req.body);
                      
            //find user 
            var dbUser = await User.findOne({ name: clientUser.name })            
            if (dbUser == null) {
                //User not found in db
                res.status(404).json(clientUser);
                return;
            }
            
            //Comparing                    
            var isCorrect = bcrypt.compareSync(clientUser.password , dbUser.password);

            if (isCorrect) {
                //Assign token (Password does not need to go in the toke?)
                var token = jwt.sign({ name: clientUser.name }, config.secret, { expiresIn: 300 })
                //Return token
                res.status(200).json(token);
                return;
            } else {
                res.status(401).json(clientUser);
                return;
            }

        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);
            res.status(500).json('Internal server error');
        }
    });

module.exports = router;