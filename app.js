const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');     
const https = require('https');
const fs = require('file-system');


const app = express();


//DATABASE CONNECTION
require('./config/db.config');

// .env configration
require('dotenv').config();

app.use(express.static('public'));

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(cors());
mongoose.Promise = global.Promise;

// TO USE LOCAL DEFAULT USER
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

const port = process.env.PORT;


// admin api route...
app.use('/admin', require('./adminapi/routes/index'));

app.get('/', (req, res) => {
    res.json({
        project : "En2ourage",
        members : "Suvayan, Srijan, Anuvab",
        organization: "Brainium",
    })
});


/** Create Server configuration */
if (process.env.NODE_ENV === 'PRODUCTION') {
    var credentials = {
      key: fs.readFileSync('/etc/letsencrypt/live/nodeserver.mydevfactory.com/privkey.pem', 'utf8'),
      cert: fs.readFileSync('/etc/letsencrypt/live/nodeserver.mydevfactory.com/fullchain.pem', 'utf8')
    };
    var server = https.createServer(credentials, app);
} else {
// var baseURL = 'http://localhost:1445/';
var server = require('http').createServer(app);
}

  // /** start listing the port */
server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});