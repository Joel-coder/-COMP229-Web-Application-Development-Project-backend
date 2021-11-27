let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");
const user = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
let options = { missingPasswordError: "Wrong / Missing Password" };

user.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model("User", user);
