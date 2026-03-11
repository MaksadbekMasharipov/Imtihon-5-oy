const CustomErrorhandler = require("../error/custom-error.handler");
const logger = require("../utils/logger");

module.exports = function (err, req, res, next) {
    logger.error("Request failed");


    // Custom error
    if (err instanceof CustomErrorhandler) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation Error",
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    // Boshqa xatolar
    return res.status(500).json({
        message: "Internal Server Error",
        error: err.message
    });
};