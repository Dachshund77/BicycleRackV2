// ******* //
// Imports //
// ******* //

var express = require('express');
//const mongose = require('mongoose')
var bodyParser = require('body-parser')

// ***** //
// Setup //
// ***** //

var server = express();
var urlCode = bodyParser.urlencoded({ extended: true });
server.use(express.static('public'));
server.use(bodyParser.json());

// ******** //
// Database //
// ******** //

// ******* //
// Routing //
// ******* //

var router = express.Router()

//Router init
router.use(function (request, response, next) {
    console.log('Recieved request, processing..')
    next();
});

server.use('/', router); //Landing

router.route('/*').get(function (request, response) {
    response.status(404).json('Shit went tits up!');
});

// *********** //
// Server init //
// ************//

server.listen(3000, () => {
    console.log("server stared!");
});

module.exports = server;