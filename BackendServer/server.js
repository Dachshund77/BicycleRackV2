// ******* //
// Imports //
// ******* //

var express = require('express');
var mongose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')

// ***** //
// Setup //
// ***** //

var server = express();
server.use(cors());
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
    useCreateIndex: true,
    useFindAndModify: false
});

// ******* //
// Routing //
// ******* //



//IMPORTANT, most middleware is configured and initalised by a case by case basis
//This was done in order to keep code readability high
//Only global middleware that uses every route should be configured here

//Route init 


var registrationsRoute = require('./routes/registrations.js');
server.use('/registrations', registrationsRoute);

var loginsRoute = require('./routes/logins.js');
server.use('/logins', loginsRoute);

var usersRoute = require('./routes/users.js');
server.use('/users', usersRoute);

var deviceRoute = require('./routes/devices.js');
server.use('/devices', deviceRoute);


//Router init
/*
router.use(function (request, response, next) { //This is actuallya logger now that i think about it
    console.log('Recieved request, processing..')
    next();
});
*/

//Global middleware
//TODO REFACTOR THIS PART HERE


server.use('/*', function (request, response) {
    response.status(404).json('Route not found!'); //Generic catch all error 
});


// *********** //
// Server init //
// ************//

server.listen(3000, () => {
    console.log("server stared!");
});

module.exports = server;