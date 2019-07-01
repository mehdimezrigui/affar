const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport= require('passport');
//load validation
const validateProfileInput = require('../validation/profileValidation')
//load profile
const Profile = require('../models/Profile')
//load user
const User = require('../models/User')

//@route Get http://localhost:3007/test
//@desc  Test profile route
//access public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works'}));


//@route Get http://localhost:3007/profiles/profile
//@desc  Test profile route
//access public

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {}
    Profile.findOne({user: req.user.id})
                    .then(profile => {
                        if(!profile){
                            errors.noprofile ='there is no profile for this user';
                            return res.status(404).json(errors)
                        }
                    res.json(profile);
                    })
                    .catch(err => res.status(404).json(err))
})

//@route Get http://localhost:3007/profile
//@desc  create user profil
//access private
router.post('/profile', passport.authenticate('jwt', {session : false}), (req, res)=>{
   const {errors, isValid } = validateProfileInput(req.body)
   //check validation

   if(!isValid){
       return res.status(400).json(errors)
   }
    //get fields
    const  profileFields ={};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    // annonce split to  array
    if(typeof req.body.annonce !== 'undefined'){
        profileFields.annonce = req.body.annonce.split(',') 
    }
Profile.findOne({user: req.user.id})
    .then(profile => {
        if(profile){
            //update
            Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            ).then(profile => res.json(profile));
        }else {
            // create

            //check if handle exists
            Profile.findOne({handle: profileFields.handle}).then(profile => {
                if(profile){
                errors.handle ='that handle already exists'
                res.status(400).json(errors)
                }
            //save profile
            new Profile(profileFields).save().then(profile => res.json(profile))
            })
        }
    })

})

module.exports = router;