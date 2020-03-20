var expres = require('express');
var router = expres.Router();
var user = require('../models/user');

//Standard registration
router.route('/')
    .post(function (request, response) {
        console.log('start post');
        try {
            //Init values
            var newUser = new user(request.body);

            //model validation, code 400 bas request
            var validationError = newUser.validateSync();
            if (validationError) {
                response.status(400).json(validationError);
                return;
            }
            console.log('after validation');

            //Insert in db, 500 on error
            newUser.save(function (dbError) {
                if (dbError) {
                    response.status(500).json(dbError);
                    return;
                }
                else {
                    response.status(201).json(newUser);
                    return;
                }
            });

            //Response created 201
        } catch (err) {
            response.status(500).json('Internal server error');
        }    
    });

module.exports = router;