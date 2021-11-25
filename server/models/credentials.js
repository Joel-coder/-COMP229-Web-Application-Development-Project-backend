let mongoose = require("mongoose");

//create a model class
let credentialModel = mongoose.Schema(
  { username: String, password: String, email: String },
  {
    collection: "portfolio",
  }
);

module.exports = mongoose.model("Credentials", credentialModel);
//show dbs - to check the dbs
// show collections - to check the tables
// db.rableName.insert({"field":"data"})
