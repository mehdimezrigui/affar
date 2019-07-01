const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("../routes/users");
const profiles = require("../routes/profile")
const annonces = require('../routes/annonces')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport Midleware
app.use(passport.initialize());

//passport Config
require("../config/passport")(passport);

const db = require("../config/Keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/users", users);
app.use("/profiles", profiles);
app.use('/annonces', annonces)

const port = 3007;

app.listen(port, () => console.log(`Server running on port ${port}`));