let express = require("express");
let router = express.Router();
let loginController = require("../controller/login");

router.post("/login", loginController.processLoginPage);

router.post("/register", loginController.processRegisterPage);

router.post("/logout", loginController.performLogout);
module.exports = router;
