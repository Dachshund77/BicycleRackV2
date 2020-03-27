var config = require('../configs/config')
var jwt = require('jsonwebtoken');

var middleware =
    function (req, res, next) {
        try {           
            //init 
            const key = config.secret;

            //get the token from the header
            var headerAuth = req.headers.authorization;
            var array = headerAuth.split(' ');
            var token = array[1];

            //Verify
            jwt.verify(token, key, function (err, decoded) {
                if(err){
                    res.status(401).json(err);                   
                    return;
                }else{
                    next();
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json('Internal server error');
        }
    };

module.exports = middleware;