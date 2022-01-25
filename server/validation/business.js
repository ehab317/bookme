const Joi = require('joi')

const businessValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().max(20),
        description: Joi.string().max(50),
        hasCategories: Joi.boolean(),
        daily: Joi.boolean(),
        userID: 
    })
    return schema.validate(data)
}

module.exports.businessValidation = businessValidation;
