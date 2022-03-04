const express = require("express");
const router = express.Router();

// controllers...
const authControllers = require('../controllers/authController');

// validators...
const {
    RegisterVal,
    LoginVal,
} = require('../validator/commonValidator');


/*======================================= Routes =================================================*/

// admin registration
router.post(
    "/registration",
    RegisterVal,
    authControllers.AdminRegistration_POST
);

// admin login
router.post(
    "/login",
    LoginVal,
    authControllers.AdminLogin_POST
);

module.exports = router;
