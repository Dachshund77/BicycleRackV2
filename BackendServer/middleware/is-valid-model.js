var middleware =
    function (modelType) {
        return async function (req, res, next) {
            try {
                //init
                var obj = new modelType(req.body);

                //Test model
                var validationError = obj.validateSync();

                //React 
                if (validationError) {
                    res.status(400).json(validationError);
                    return;
                } else {
                    next();
                }

            } catch (err) {
                console.log(err);
                res.status(500).json('Internal server error');
            }
        }
    };

module.exports = middleware;