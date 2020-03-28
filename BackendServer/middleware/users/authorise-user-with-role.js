var config = require('../configs/config')
var jwt = require('jsonwebtoken');
var User = require('../../models/user');

var middleware =
    function (allowedRoles) {
        return async function (req, res, next) {
            try {
                //Skip if already authorised
                if (res.locals.isAuthenticated == true) {
                    next();
                    return;
                }

                //init 
                var isAllowed = false;

                //get the token from the header 
                var headerAuth = req.headers.authorization;
                var array = headerAuth.split(' ');
                var token = array[1];

                //Decode 
                var decoded = jwt.decode(token);

                //get dbUser from DB and chache it into res
                var dbUser = await User.findOne({ name: decoded.name })
                
                //Test against allowed roles
                userRole = dbUser.role;
                allowedRoles.forEach(element => {
                    if (element == userRole) {
                        isAllowed = true;
                    }
                });

                //Set authorisation if valid
                if (isAllowed) {
                    res.locals.isAuthenticated = true
                }

                //Go to next middleware
                next();

            } catch (err) {
                console.log(err);
                res.status(500).json('Internal server error');
            }
        };
    };

module.exports = middleware;