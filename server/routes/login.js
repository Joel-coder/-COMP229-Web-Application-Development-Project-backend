let express = require("express");
let router = express.Router();
let loginController = require("../controller/login");

router.post("/login", loginController.processLoginPage);

router.post("/register", loginController.processRegisterPage);

module.exports = router;
