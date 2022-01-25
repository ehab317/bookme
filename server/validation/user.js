const Joi = require('joi')

const signupValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8)
    })
    return schema.validate(data)
}

const signinValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8)
    })
    return schema.validate(data)
}

module.exports.signupValidation = signupValidation;
module.exports.signinValidation = signinValidation;