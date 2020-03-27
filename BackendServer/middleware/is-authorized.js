var config = require('../configs/config')
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var middleware =
    function (allowedRoles) {
        return async function (req, res, next) {
            try {
                //init 
                const key = config.secret;
                var isAllowed = false;

                //get the token from the header 
                //Does this work: request.headers['x-api-token'] ???
                var headerAuth = req.headers.authorization;
                var array = headerAuth.split(' ');
                var token = array[1];

                //Decode 
                var decoded = jwt.decode(token);
               
                //get role from DB
                var dbUser = await User.findOne({ name: decoded.name })
                if (dbUser == null) {
                    //User not found in db
                    res.status(404).json(clientUser);
                    return;
                }

                //TODO:
                //Test if Owner

                //Test against allowed roles
                userRole = dbUser.role;
                allowedRoles.forEach(element => {
                    if (element == userRole) {
                        isAllowed = true;
                    }
                });

                //Decide further actions
                if (isAllowed) {
                    next();
                } else {
                    res.status(403).json(req);
                }
            } catch (err) {
                console.log(err);
                res.status(500).json('Internal server error');
            }
        };
    };

module.exports = middleware;