let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let DB = require("../config/db");
//create the User Model instance
let userModel = require("../models/user");
let User = userModel.User;

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server err?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.json({
        success: false,
      });
    }
    req.login(user, (err) => {
      // server error?
      if (err) {
        return next(err);
      }

      const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
      };

      const authToken = jwt.sign(payload, DB.Secret, {
        expiresIn: 604800, // 1 week
      });

      /* TODO - Getting Ready to convert to API
          res.json({success: true, msg: 'User Logged in Successfully!', user: {
              id: user._id,
              displayName: user.displayName,
              username: user.username,
              email: user.email
          }, token: authToken});
          */

      return res.json({
        success: true,
        msg: "User Logged in Successfully!",
        user: {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          email: user.email,
        },
        token: authToken,
      });
    });
  })(req, res, next);
};

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName,
  });
  console.log(req.body);
  //passing err to my callback function
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.json({ success: false, msg: err });
    } else {
      // if no error exists, then registration is successful

      // redirect the user and authenticate them

      /* TODO - Getting Ready to convert to API
          res.json({success: true, msg: 'User Registered Successfully!'});
          */

      return passport.authenticate("local")(req, res, () => {
        res.json({ success: true, msg: "User Registered Successfully!" });
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.json({ success: true, msg: "Succesfully logout" });
};
