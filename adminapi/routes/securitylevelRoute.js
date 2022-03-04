const express = require("express");
const router = express.Router();
const validateToken = require('../utils/token').validateToken;

// controllers...
const securitylevelController = require('../controllers/securitylevelController');

// validators...
const {
    SecuritylevelAddVal,
    SecuritylevelUpdateVal
} = require('../validator/commonValidator');


/*======================================= Routes =================================================*/

// add user type
router.post(
    "/add-securitylevel",
    SecuritylevelAddVal,
    validateToken,
    securitylevelController.AddSecuritylevel_POST
);

// get user type
router.get(
    "/get-all-securitylevel",
    validateToken,
    securitylevelController.GetAllSecuritylevel_GET
);

// get user type by id
router.post(
    "/get-securitylevel-by-id",
    validateToken,
    securitylevelController.GetSecuritylevelById_POST
);

// admin login
router.post(
    "/update-securitylevel",
    SecuritylevelUpdateVal,
    validateToken,
    securitylevelController.UpdateSecuritylevel_POST
);

module.exports = router;