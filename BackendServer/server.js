// ******* //
// Imports //
// ******* //

var express = require('express');
var mongose = require('mongoose')
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

//Change that if needed
mongose.connect('mongodb://localhost:27017/bikeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
});

// ******* //
// Routing //
// ******* //

var router = express.Router()

var registrationsRoute = require('./routes/registrations.js');
server.use('/registrations', registrationsRoute);

//Router init
router.use(function (request, response, next) {
    console.log('Recieved request, processing..')
    next();
});

server.use('/', router); //Landing

router.route('/*').get(function (request, response) {
    response.status(404).json('Route not found!'); //Generic error 
});

// *********** //
// Server init //
// ************//

server.listen(3000, () => {
    console.log("server stared!");
});

module.exports = server;