let mongoose = require("mongoose");

//create a model class
let contactInfoModel = mongoose.Schema(
  { contact_name: String, contact_number: String, email: String },
  {
    collection: "contact_info",
  }
);

module.exports = mongoose.model("Contact_Info", contactInfoModel);

//db.contact_info.find()