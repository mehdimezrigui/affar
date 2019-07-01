const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports= function validateRegisterInput(data) {
let errors = {};
data.firstName= !isEmpty(data.firstName) ? data.firstName : '';
data.lastName= !isEmpty(data.lastName) ? data.lastName : '';
data.login= !isEmpty(data.login) ? data.login : '';
data.password= !isEmpty(data.password) ? data.password : '';
data.email= !isEmpty(data.email) ? data.email : '';
data.phone= !isEmpty(data.phone) ? data.phone : '';
data.adresse= !isEmpty(data.adresse) ? data.adresse : '';
data.ville= !isEmpty(data.ville) ? data.ville : '';
data.region= !isEmpty(data.region) ? data.region : '';
data.cp= !isEmpty(data.cp) ? data.cp : '';

if(!Validator.isLength(data.login, {min:2 , max: 30})){
    errors.login ="login must be between 2 and 30 characters";
}

if(Validator.isEmpty(data.login)){
    errors.login ="login field is required"
}
if(Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password ="password field is required"
}
if(Validator.isEmpty(data.lastName)){
    errors.lastName ="loginlast Name field is required"
}
if(Validator.isEmpty(data.firstName)){
    errors.firstName ="first Name field is required"
}
if(Validator.isEmpty(data.email)){
    errors.email ="email field is required"
}
if(Validator.isEmpty(data.phone)){
    errors.phone ="phone field is required"
}
if(Validator.isEmpty(data.adresse)){
    errors.adresse ="adresse field is required"
}
if(Validator.isEmpty(data.ville)){
    errors.ville ="ville field is required"
}
if(Validator.isEmpty(data.region)){
    errors.region ="region field is required"
}
if(Validator.isEmpty(data.cp)){
    errors.cp ="cp field is required"
}
    return {
        errors,
        isValid: isEmpty(errors)
    }

}