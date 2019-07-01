const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AnnonceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  prixUnitaire: {
      type: String,
      required: true
  },
  condition: {
      type: String,
      required: true
  },
  etatOffre: {
      type: String,
      required: true
  },
  participation: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      pourcentage: {
        type: String,
        required: true
      },
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Annonce = mongoose.model('annonce', AnnonceSchema);