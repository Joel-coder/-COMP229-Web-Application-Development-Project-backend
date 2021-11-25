let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let Credentials = require("../models/credentials");

/* Reado operation */

router.get("/", (req, res, next) => {
  Credentials.find((err, CredentialDetails) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(CredentialDetails);
      res.render("login", {
        title: "Credentials",
        CredentialDetails: CredentialDetails,
      });
    }
  });
});
module.exports = router;
