var User = require('../../models/user');
var jwt = require('jsonwebtoken');

var middleware =
    function (req, res, next) {
        try {
            //get payload
            var headerAuth = req.headers.authorization;
            var array = headerAuth.split(' ');
            var token = array[1];
            var decoded = jwt.decode(token);
            var validName = decoded.name;

            //Get username from url
            var userName = req.params.name

            //compate with the provided paramter
            if (validName == userName) {
                res.locals.recordOwner = true;
            } else {
                res.locals.recordOwner = false;
            }

            next();

        } catch (err) {
            console.log(err);
            res.status(500).json('Internal server error');
        }
    };

module.exports = middleware;