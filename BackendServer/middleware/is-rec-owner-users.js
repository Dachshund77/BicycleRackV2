var User = require('../models/user');

var middleware =
    async function (req, res, next) {
        try {
            //Get owner name
            if(typeof req.body.name === 'undefined'){
                //cant resolve this middleware without name
                next();
                return;
            }
            console.log(req.body)
            console.log('TEST 3 '+ req.body.name);
            //get dbUser from DB and chache it into response
            var dbUser;
            if (typeof res.locals.dbUserChache === 'undefined') {
                dbUser = await User.findOne({ name: req.body.name })
                if (dbUser == null) {
                    //User not found in db
                    res.status(404).json(dbUser);
                    return;
                }
                res.locals.dbUserChache = dbUser;
            } else {
                dbUser = res.locals.dbUserChache;
            }

            //set flags if username and request name match
            //tbh kinda retarded check but this is proof of conecept i guess.
            if(req.body.name == dbUser.name){
                console.log('TEST 1 '+ req.body.name);
                console.log('TEST 2 '+ dbUser.name);
                res.locals.authorized = true;
            }

            //react 
            next();

        } catch (err) {
            console.log(err);
            res.status(500).json('Internal server error');
        }
    };

module.exports = middleware;