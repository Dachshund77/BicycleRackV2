var expres = require('express');
var router = expres.Router();
var Device = require('../models/device');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var isAutenticated = require('../middleware/is-authenticated');
var isAuthorized = require('../middleware/is-authorized');
var isValidModel = require('../middleware/is-valid-model');

//post new device without restrictions
router.post('/', [
    isAutenticated,
    isAuthorized(['Device','Admin']),
    isValidModel(Device)
]);
router.route('/')
    .post(async function (req, res) {
        try {
            //Init values
            var newDevice = new Device(req.body);

            //generate password
            newDevice.password = bcrypt.hashSync(newDevice.password, bcrypt.genSaltSync(10));

            //Set last update time
            newDevice.lastUpdateReceived = Date.now();

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
    isAutenticated,
    isAuthorized(['Device','Admin']),
    isValidModel(Device)
]);
router.route('/:_id')
    .put(async function (req, res) {
        try {
            //Rehash password
            req.body.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));

            //Update date now
            req.body.lastUpdateReceived = Date.now();

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
    isAutenticated,
    isAuthorized(['Admin']),
    isValidModel(Device)
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
    isAutenticated,
    isAuthorized(['Admin']),
    isValidModel(User)
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
    isAutenticated,
    isAuthorized(['Admin']),
    isValidModel(Device)
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