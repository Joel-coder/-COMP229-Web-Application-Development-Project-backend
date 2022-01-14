let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let DB = require("../config/db");
let jwt = require("jsonwebtoken");

let passport = require("passport");

//let ContactsList = require("../models/businessContactsList");

let listController = require("../controller/businessContactsList");
/* Read operation */

// helper function for guard purposes
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzVkNGFkNmQ3NjQ5N2U3MmZiMjg4NiIsInVzZXJuYW1lIjoianZhcmdhcyIsImlhdCI6MTY0MjEzMzE0MiwiZXhwIjoxNjQyNzM3OTQyfQ.4SntMhcaCPnAPtsEHiQIeZnWbPcbdW8pHcBGMTP3ivM";
async function requireAuth(req, err, next) {
  try {
    var decoded = await jwt.verify(token, DB.Secret);
  } catch {
    err;
  }
  next();
}

router.get("/", requireAuth, listController.displayContactList);

/*Create operation*/
router.get("/add", listController.displayAddList);
/* Processing the add Page */
router.post("/add", listController.processAddList);

/* display Update operation*/
router.get("/edit/:id", listController.displayUpdateList);

/* Processing the Update Page */
router.post("/edit/:id", listController.processUpdateList);

/*delete operation*/
router.get("/delete/:id", listController.processDeleteList);

module.exports = router;

// router.get("/test", (req, res) => {
//   ContactsList.find((err, businessContactsList) => {
//     if (err) {
//       return console.error(err);
//     } else {
//       console.log(businessContactsList);
//       res.send({ businessContactsList });
//     }
//   });
// });

// router.post("/add", (req, res) => {
//   let newContact = ContactsList({
//     contact_name: req.body.contact_name,
//     contact_number: req.body.contact_number,
//     email: req.body.email,
//   });
//   console.log(newContact);
//   ContactsList.create(newContact, (err, newContact) => {
//     if (err) {
//       console.log(err);
//       res.end(err);
//     } else {
//       res.send({ newContact });
//       console.log({ newContact });
//       // res.redirect("/contactInfo");
//     }
//   });
// });
