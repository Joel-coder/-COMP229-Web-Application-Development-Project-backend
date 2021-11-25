let express = require("express");
let router = express.Router();

let indexController = require("../controller/index");

/* GET home page. */
router.get("/", indexController.displayHomePage);
/* GET home page. */
router.get("/home", indexController.displayHomePage);

/* GET About Us page. */
router.get("/about", indexController.displayAboutPage);

/* GET Project page. */
router.get("/project", indexController.displayProjectPage);

/* GET Services page. */
router.get("/services", indexController.displayServicesPage);

/* GET Contact Us page. */
router.get("/contact", indexController.displayContactPage);

/* GET Router for displaying the Login page */
router.get("/login", indexController.displayLoginPage);

/* POST Router for processing the Login Page */
router.post("/login", indexController.processLoginPage);

/* GET Router for displaying the register page */
router.get("/register", indexController.displayRegisterPage);

/* POST Router for processing the register Page */
router.post("/register", indexController.processRegisterPage);

/* GET Router for perform log out */
router.get("/logout", indexController.performLogout);

module.exports = router;
