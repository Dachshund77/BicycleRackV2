
var middleWare =
    function (eq, res, next) {
        try {
            //Check varaible
            if (typeof res.locals.isAuthenticated === 'undefined' ||
                res.locals.isAuthenticated == false) {
                //Allow further middleware
                next();
                return;
            } else {
                //Is fobidden
                res.status(403).json(req.body);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json('Internal server error');
        }


    };

module.exports = middleWare;