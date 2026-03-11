const CustomErrorhandler = require("../error/custom-error.handler");
const modelsValidator = require("../validator/models.validate");


module.exports = function(req, res, next) {
    if (req.file) {
        req.body.imageUrl = `/uploads/models/${req.file.filename}`
    }

    const { error } = modelsValidator(req.body)

    if (error) {
        throw CustomErrorhandler.BadRequest(error.message)
    }

    next()
};