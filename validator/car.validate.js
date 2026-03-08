const joi = require("joi")

const carValidator = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        price: joi.string().required(),
        imageUrl: joi.string().required(),
        marka: joi.string().required(),
        tanirovka: joi.string().required(),
        motor: joi.string().required(),
        year: joi.number().required(),
        color: joi.string().required(),
        distance: joi.string().required(),
        gearBook: joi.string().required(),
        description: joi.string().required(),
        umumiyXarajat: joi.string().required(),
    })

    return schema.validate(data)
} 

module.exports = carValidator
