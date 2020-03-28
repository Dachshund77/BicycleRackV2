var bcrypt = require('bcrypt');

var middleWare = function (req, res, next) {
    try {

       //generate password
       req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        next();

    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }
};

module.exports = middleWare;