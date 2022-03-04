const express = require("express");
const router = express.Router();
const validateToken = require('../utils/token').validateToken;

// controllers...
const usertypeController = require('../controllers/usertypeController');

// validators...
const {
    UsertypeAddVal,
    UsertypeUpdateVal
} = require('../validator/commonValidator');


/*======================================= Routes =================================================*/

// add user type
router.post(
    "/add-usertype",
    UsertypeAddVal,
    validateToken,
    usertypeController.AddUsertype_POST
);

// get user type
router.get(
    "/get-all-usertype",
    validateToken,
    usertypeController.GetAllUsertype_GET
);

// get user type by id
router.post(
    "/get-usertype-by-id",
    validateToken,
    usertypeController.GetUsertypeById_POST
);

// admin login
router.post(
    "/update-usertype",
    UsertypeUpdateVal,
    validateToken,
    usertypeController.UpdateUsertype_POST
);

module.exports = router;