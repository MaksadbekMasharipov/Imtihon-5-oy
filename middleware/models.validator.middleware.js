const CustomErrorhandler = require("../error/custom-error.handler");
const modelsValidator = require("../validator/models.validate");


module.exports = function(req, res, next) {
    const {error} = modelsValidator

    if (error) {
        throw CustomErrorhandler.BadRequest(error.message)
    }

    next()
};