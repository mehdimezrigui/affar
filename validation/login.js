const Validator = require('validator')
const isEmpty =require('./is-empty')

module.exports  = function validateLoginInput(data){
    let errors= {};

    data.login = !isEmpty(data.login)? data.login : '';
    data.password = !isEmpty(data.password)? data.password : ''
    if(!Validator.isEmpty(data.login)){
        errors.login = "Login fiels is required"
    }
    if(!Validator.isEmpty(data.password)){
        errors.login = "Password fiels is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}