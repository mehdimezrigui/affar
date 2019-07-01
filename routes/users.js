const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
//load input validation
const validateRegisterInput = require ('../validation/register')
//load user model
const User = require("../models/User");
//route: http://localhost:3007/users/test
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//route: http://localhost:3007/users/signup
//desc: register new user
//isPrivate: false
router.post("/signup", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  // const avatar = req.body.avatar;
  const login = req.body.login;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const adresse = req.body.adresse;
  const ville = req.body.ville;
  const region = req.body.region;
  const cp = req.body.cp
  
  User.findOne({ login }).then(user => {
    if (user) {
      return res.json({ msg: "user already exist" });
    }
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      // avatar: avatar,
      login: login,
      password: password,
      email: email,
      phone: phone,
      adresse: adresse,
      ville: ville,
      region: region,
      cp: cp
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;

        newUser
          .save()
          .then(saved => res.json(saved))
          .catch(err => console.log(err));
      });
    });
  });
});

//route: http://localhost:3007/users/login
//desc: login user
//isPrivate: false
router.post("/login", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  // const {errors, isValid} = validateRegisterInput(req.body);
  //check validation
  // if(!isValid){
  //   return res.status(400).json(errors);
  // }
  User.findOne({ login }).then(user => {
    if (!user) {
      return res.json({ msg: "login not found" });
    }
    bcrypt.compare(password, user.password).then(isMatched => {
      if (isMatched) {
        const payload = { id: user.id, login: user.login, role: user.role };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({ token: "Bearer " + token });
          }
        );
      } else {
        return res.json({ msg: "password incorrect" });
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;