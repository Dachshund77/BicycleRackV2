var expres = require('express');
var router = expres.Router();
var Device = require('../models/device');
var bcrypt = require('bcrypt');
var requireAuthentication = require('../middleware/auth/require-authentication');
var authoriseUserWithRole = require('../middleware/users/authorise-user-with-role');
var isValidModel = require('../middleware/is-valid-model');
var requireAuthorisation = require('../middleware/auth/require-authorisation');
var setLastUpdated = require('../middleware/devices/set-last-updated');
var hashPassword = require('../middleware/auth/hash-password');

//post new device without restrictions
router.post('/', [
    requireAuthentication,
    authoriseUserWithRole(['Admin']),
    requireAuthorisation,
    isValidModel(Device),
    setLastUpdated,
    hashPassword
]);
router.route('/')
    .post(async function (req, res) {
        try {
            //Init values
            var newDevice = new Device(req.body);

            //Insert in DB
            newDevice.save(function (dbError) {
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
                    res.status(201).json(newDevice);
                    return;
                }
            });

        } catch (err) {
            console.log(err);
            res.status(500).json('Internal server error');
        }
    });

//Update a device 
router.put('/:_id', [
    requireAuthentication,
    authoriseUserWithRole(['Device','Admin']),
    isValidModel(Device),
    setLastUpdated,
    hashPassword
]);
router.route('/:_id')
    .put(async function (req, res) {
        try {        
            //Update in db
            var updatedDevice = await User.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
            if (updatedDevice == null) {
                //User not found in db
                res.status(404).json(updatedDevice);
                return;
            }
            //respond
            res.status(200).json(updatedDevice);

        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);
            res.status(500).json('Internal server error');
        }
    });

//Delete a device by id 
router.delete('/:_id', [
    requireAuthentication,
    authoriseUserWithRole(['Admin'])
]);
router.route('/:_id')
    .delete(async function (req, res) {
        try {
            //delete
            var deletedDevice = await User.findOneAndDelete({ name: req.params._id });
            if (deletedDevice === null) {
                //User not found in db
                res.status(404).json(req.body);
                return;
            }

            //send response 
            res.status(200).json(deletedDevice);

        } catch (err) {
            //Shit hit the fan somehow
            console.log(err);
            res.status(500).json('Internal server error');
        }
    });

//get a device by id
router.get('/:_id', [
    requireAuthentication,
    authoriseUserWithRole(['Admin'])
]);
router.route('/:_id')
    .get(async function (req, res) {
        try {
            //delete
            var foundDevice = await Device.findOne({ name: req.params._id });
            if (foundDevice === null) {
                //User not found in db
                res.status(404).json(req.body);
                return;
            }

            //send response 
            res.status(200).json(foundDevice);

        } catch (err) {
            console.log(err);
            res.status(500).json('Internal server error');
        }
    });

//get all devices
router.get('/', [
    requireAuthentication,
    authoriseUserWithRole(['Admin'])
]);
router.route('/') //get all
    .get(async function (req, res) {
        //get all
        var foundDevices = await Device.find();
        if (foundDevices === null) {
            //User not found in db
            res.status(404).json(req.body);
            return;
        }

        //send response 
        res.status(200).json(foundDevices);
    });

//get devices by filtering
router.route('/fdsafafsaf') //dynamic filtering???
    .get(function (req, res) {
        response.status(501);
        return;
    });

module.exports = router;