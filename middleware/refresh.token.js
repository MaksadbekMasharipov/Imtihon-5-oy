const CustomErrorhandler = require("../error/custom-error.handler")
const jwt = require("jsonwebtoken")
const { access_token } = require("../utils/jwt")

module.exports = function (req, res, next) {
    try {
        const authorization = req.cookies.refresh_token

        if (!authorization) {
            throw CustomErrorhandler.UnAuthorized("refresh token not found")
        }

        if (bearer !== "Bearer" || !token) {
            throw CustomErrorhandler.UnAuthorized("Token is required")
        }

        const decode = jwt.verify(authorization, process.env.SEKRET_KEY)

        const accessToken = access_token({ id: decode._id, role: decode.role, email: decode.email })

        res.json({ accessToken })
    } catch (error) {
        next(error)
    }
}