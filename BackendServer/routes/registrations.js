var expres = require('express');
var router = expres.Router();
var user = require('../models/user');

//Standard registration
router.route('/')
    .post(function(request, response) {
        
        var newUser = new user(request.body);

        newUser.save(function (err) {
            if(err){
                console.error(err);
            }
            else{
                response.status(201).json(newUser);
            }
        });
    });

module.exports = router;