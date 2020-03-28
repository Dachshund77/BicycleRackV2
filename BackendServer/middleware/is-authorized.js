var config = require('../configs/config')
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var middleware =
    function (allowedRoles) {
        return async function (req, res, next) {
            try {
                //init 
                const key = config.secret; //Shouldent we need that?
                var isAllowed = false;

                //get the token from the header 
                //Does this work: request.headers['x-api-token'] ???
                var headerAuth = req.headers.authorization;
                var array = headerAuth.split(' ');
                var token = array[1];

                //Decode 
                var decoded = jwt.decode(token);

                //get dbUser from DB and chache it into res
                var dbUser = await User.findOne({ name: decoded.name })
                if (dbUser == null) {
                    //User not found in db
                    //403 cause authenication failed
                    res.status(403).json(req.body);
                    return;
                }


                //Test if Owner or authorized ealier               
                if (typeof res.locals.recordOwner === 'undefined' || res.locals.recordOwner == false) {
                    //Test against allowed roles
                    userRole = dbUser.role;
                    allowedRoles.forEach(element => {
                        if (element == userRole) {
                            isAllowed = true;
                        }
                    });
                } else {
                    //Use chached value
                    isAllowed = true;
                }

                //Decide further actions
                if (isAllowed) {
                    next();
                } else {
                    res.status(403).json(req.body);
                    return;
                }
            } catch (err) {
                console.log(err);
                res.status(500).json('Internal server error');
            }
        };
    };

module.exports = middleware;