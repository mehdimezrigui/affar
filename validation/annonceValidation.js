const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAnnonceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.prixUnitaire = !isEmpty(data.prixUnitaire) ? data.prixUnitaire : '';
  data.condition = !isEmpty(data.condition) ? data.condition : '';
  data.etatOffre = !isEmpty(data.etatOffre) ? data.etatOffre : '';
  data.avatar = !isEmpty(data.avatar) ? data.avatar : '';

  if (!Validator.isLength(data.title, { min: 5, max: 300 })) {
    errors.title = 'title annonce must be between 5 and 300 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'title field is required';
  }
  if (!Validator.isLength(data.description, { min: 10, max: 400 })) {
    errors.description = 'description must be between 10 and 400 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'description field is required';
  }
  if (Validator.isEmpty(data.prixUnitaire)) {
    errors.prixUnitaire = 'prix Unitaire field is required';
  }
  if (Validator.isEmpty(data.condition)) {
    errors.condition = 'condition field is required';
  }
  if (Validator.isEmpty(data.etatOffre)) {
    errors.etatOffre = 'etat offre field is required';
  }
  if (Validator.isEmpty(data.avatar)) {
    errors.avatar = 'avatar field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
