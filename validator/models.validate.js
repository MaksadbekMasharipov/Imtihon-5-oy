const joi = require("joi")

const modelsValidator = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        imageUrl: joi.string().required(),

    })

    return schema.validate(data)
} 

module.exports = modelsValidator
