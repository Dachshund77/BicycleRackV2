var expres = require('express');
var router = expres.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../configs/config');
var isAutenticated = require('../middleware/is-authenticated');
var isAuthorized = require('../middleware/is-authorized');
var isValidModel = require('../middleware/is-valid-model');
var authoriseOwnerUsers = require('../middleware/authorise-owner-user');

//Update a User
router.put('/:name', [
    isAutenticated,
    authoriseOwnerUsers,
    isAuthorized(['Admin']),
    isValidModel(User)
]);
router.route('/:name')
    .put(async function (req, res) {
        try {
            //init 
            var clientUser = req.body;
            console.log('req.params.name ' + req.params.name);

            //fetch from db
            var dbUser;
            dbUser = await User.findOne({ name: req.params.name });
            if (dbUser === null) {
                //User not found in db
                res.status(404).json(dbUser);
                return;
            }

            console.log(dbUser.get('role'));

            //NEVER allow users to rewrite their role
            if (dbUser.get('role') == 'User') {
                clientUser.role = 'User';
            }

            //TODO THIS route bricks the password, need a fix mb redirect

            //Update in db
            var updatedUser = await User.findOneAndUpdate({ name: req.params.name }, req.body, { new: true })
            if (updatedUser == null) {
                //User not found in db
                res.status(404).json(updatedUser);
                return;
            }

            //respond
            res.status(200).json(updatedUser);

        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);
            res.status(500).json('Internal server error');
        }
    });

//Delete users by ID
router.delete('/:name', [
    isAutenticated,
    authoriseOwnerUsers,
    isAuthorized(['Admin']),
    isValidModel(User)
]);
router.route('/:name')
    .delete(async function (req, res) {
        try {
            //init        

            //delete
            var deletedUser = await User.findOneAndDelete({ name: req.params.name });
            if (deletedUser === null) {
                //User not found in db
                res.status(404).json(req.body);
                return;
            }

            //send response 
            res.status(200).json(deletedUser);

        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);
            res.status(500).json('Internal server error');
        }
    });

//get singe route
router.get('/:name', [
    isAutenticated,
    authoriseOwnerUsers,
    isAuthorized(['Admin']),
    isValidModel(User)
]);
router.route('/:name')
    .get(async function (req, res) {
        try {    

            //delete
            var foundUser = await User.findOne({ name: req.params.name });
            if (foundUser === null) {
                //User not found in db
                res.status(404).json(req.body);
                return;
            }

            //send response 
            res.status(200).json(foundUser);

        } catch (err) {
            console.log(err);
            res.status(500).json('Internal server error');
        }
    });

//Get all route 
//get singe route
router.get('/', [
    isAutenticated,
    isAuthorized(['Admin']),
    isValidModel(User)
]);
router.route('/') //get all
    .get(async function (req, res) {
         //get all
         var foundUser = await User.find();
         if (foundUser === null) {
             //User not found in db
             res.status(404).json(req.body);
             return;
         }

         //send response 
         res.status(200).json(foundUser);
    });

    router.route('/fdsafafsaf') //dynamic filtering???
    .get(function (req, res) {
        response.status(501);
        return;
    });


module.exports = router;