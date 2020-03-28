
var middleWare = function (req, res, next) {
    try {

        //Get request body and set the time now
        req.body.lastUpdateReceived = Date.now();
        next();
        
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }
};

module.exports = middleWare;