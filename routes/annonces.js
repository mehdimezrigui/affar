const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Annonce model
const Annonce = require('../models/Annonce');
// Profile model
const Profile = require('../models/Profile');

// Validation
const validateAnnonceInput = require('../validation/annonceValidation');

// @route   GET /annonces/test
// @desc    Tests annonce route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Annonce Works' }));

// @route   GET /annonce
// @desc    Get annonce
// @access  Public
router.get('/', (req, res) => {
  Annonce.find()
    .sort({ date: -1 })
    .then(annonce => res.json(annonce))
    .catch(err => res.status(404).json({ noannoncesfound: 'No annonce found' }));
});

// @route   GET /annonce/:id
// @desc    Get annonce by id
// @access  Public
router.get('/:id', (req, res) => {
  // res.json({msg: req.params.id})
  Annonce.findOne({_id: req.params.id})
    .then(annonce => res.json(annonce))
    .catch(err =>
      res.status(404).json({ noannoncefound: 'No annonce found with that ID' })
    );
});

// @route   /annonce
// @desc    Create annonce
// @access  Private
router.post(
  '/annonce',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAnnonceInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newAnnonce = new Annonce({
      title: req.body.title,
      description: req.body.description,
      avatar: req.body.avatar,
      prixUnitaire: req.body.prixUnitaire,
      condition: req.body.condition,
      etatOffre: req.body.etatOffre,
      user: req.user.id
    });

    newAnnonce.save().then(Annonce => res.json(Annonce));
  }
);

// @route   DELETE /annonce/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Annonce.findById(req.params.id)
        .then(Annonce => {
          // Check for Annonce owner
          if (Annonce.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          Annonce.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ Annoncenotfound: 'No Annonce found' }));
    });
  }
);


// @route   /participate/:id
// @desc    Add patrticipate to Annonce
// @access  Private
router.post(
  '/participate/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // const { errors, isValid } = validateAnnonceInput(req.body);
    // // Check Validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }

    Annonce.findById(req.params.id)
      .then(Annonce => {
        const newPart = {
          pourcentage: req.body.pourcentage,
          user: req.user.id
        };

        // Add to participate array
        Annonce.participation.unshift(newPart);

        // Save
        Annonce.save().then(annonce => res.json(annonce));
      })
      .catch(err => res.status(404).json({ annoncenotfound: 'No Annonce found' }));
  }
);

// @route   DELETE /participate/:id/:part_id
// @desc    Remove participation from Annonce
// @access  Private
router.delete(
  '/participate/:id/:part_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Annonce.findById(req.params.id)
      .then(Annonce => {
        // Check to see if participation exists
        if (
          Annonce.participation.filter(
            participation => participation._id.toString() === req.params.part_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ partnotexists: 'Participation does not exist' });
        }

        // Get remove index
        const removeIndex = Annonce.participation
          .map(item => item._id.toString())
          .indexOf(req.params.part_id);

        // Splice annonce out of array
        Annonce.participation.splice(removeIndex, 1);

        Annonce.save().then(Annonce => res.json(Annonce));
      })
      .catch(err => res.status(404).json({ annoncenotfound: 'No Annonce found' }));
  }
);

module.exports = router;
