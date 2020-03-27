var middleware =
    function (reg, res, next) {
        console.log('middleware called')
        next();
    };

module.exports = middleware;