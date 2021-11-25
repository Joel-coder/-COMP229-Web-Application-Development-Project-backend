let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let jwt = require("jsonwebtoken");

let ContactsList = require("../models/businessContactsList");

module.exports.displayContactList = (req, res, next) => {
  ContactsList.find((err, businessContactsList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(businessContactsList);
      res.send({ businessContactsList });
    }
  });
};

module.exports.displayAddList = (req, res, next) => {
  res.render("businessContactDetails/add", {
    title: "Add contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.processAddList = (req, res, next) => {
  let newContact = ContactsList({
    contact_name: req.body.contact_name,
    contact_number: req.body.contact_number,
    email: req.body.email,
  });

  ContactsList.create(newContact, (err, newContact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //  res.redirect("/contactInfo");
    }
  });
};

module.exports.displayUpdateList = (req, res, next) => {
  let id = req.params.id;

  ContactsList.findById(id, (err, contactInfo) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.send({ contactInfo });
    }
  });
};

module.exports.processUpdateList = (req, res, next) => {
  let id = req.params.id;

  let updateContact = ContactsList({
    _id: id,
    contact_name: req.body.contact_name,
    contact_number: req.body.contact_number,
    email: req.body.email,
  });

  ContactsList.updateOne({ _id: id }, updateContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(updateContact);
      res.redirect("/contactInfo");
    }
  });
};

module.exports.processDeleteList = (req, res, next) => {
  let id = req.params.id;
  ContactsList.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/contactInfo");
    }
  });
};
