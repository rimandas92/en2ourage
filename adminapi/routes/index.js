const express = require('express');
const app = express.Router();

// admin auth...
const auth = require('./adminRoute');
app.use('/api/auth', auth);

// user type
const usertype = require('./usertypeRoute');
app.use('/api/usertype', usertype);

// security level
const securitylevel = require('./securitylevelRoute');
app.use('/api/securitylevel', securitylevel);


module.exports = app;

