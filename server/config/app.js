// installed 3rd party packages
let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

// modules for authentication
let session = require("express-session");
let passport = require("passport");

let passportJWT = require("passport-jwt");
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require("passport-local");
let localStrategy = passportLocal.Strategy;
let flash = require("connect-flash");

let cors = require("cors");
//database setup
let mongoose = require("mongoose");
let DB = require("./db");

//point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewURLParser: true, useUnifiedTopology: true });

//handle error
let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("Connected to MongoDB..");
});

let ContactInfoRouter = require("../routes/businessContactsList");
let usersRouter = require("../routes/login");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credential: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

//Setup express session
app.use(
  session({
    secret: DB.Secret,
    saveUninitialized: false,
    resave: false,
  })
);

// initialize flash
app.use(flash());

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Routes for register

//app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Passport user configuration

//create a user model iinstance
let userModel = require("../models/user");
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());

app.use("/", usersRouter);
//app.use("/login", credentialRouter);
app.use("/contactInfo", ContactInfoRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Eror" });
});

module.exports = app;
