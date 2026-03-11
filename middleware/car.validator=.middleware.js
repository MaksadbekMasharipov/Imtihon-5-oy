const CustomErrorhandler = require("../error/custom-error.handler");
const carValidator = require("../validator/car.validate");


module.exports = function(req, res, next) {
    if (req.file) {
        req.body.imageUrl = `/uploads/cars/${req.file.filename}`
    }

    const {error} = carValidator(req.body)

    if (error) {
        throw CustomErrorhandler.BadRequest(error.message)
    }

    next()
};