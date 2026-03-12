
const AuthSchema = require("../schema/auth.schema");
const bcrypt = require("bcryptjs");
const sendMessaege = require("../utils/send-email");
const { verify } = require("jsonwebtoken");
const { access_token, refresh_token } = require("../utils/jwt");
const CustomErrorhandler = require("../error/custom-error.handler");
const logger = require("../utils/logger");

const register = async (req, res, next) => {
    try {
        // ma'lumotlarni olish
        const { username, email, password } = req.body

        // foydalanuvchi bor yoki yo'qligini tekshirish
        const foundedUser = await AuthSchema.findOne({ email })
        if (foundedUser) {
            throw CustomErrorhandler.BadRequest("User already exsits")
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const code = +Array.from({ length: 6 }, () => Math.round(Math.random() * 6)).join("")

        await sendMessaege(code, email, username)

        await AuthSchema.create({
            username,
            email,
            password: hashPassword,
            otp: code,
            otpTime: Date.now() + 120000
        })

        res.status(201).json({ message: "Registered " });

    } catch (error) {
        next(error)
    }
}


const varify = async (req, res, next) => {
    try {

    
        const { email, otp } = req.body

        const foundedUser = await AuthSchema.findOne({ email })

        logger.debug("OTP verification attempt")

        if (!foundedUser) {
            throw CustomErrorhandler.BadRequest("User not found")
        }

        if (!foundedUser.otp) {
            throw CustomErrorhandler.UnAuthorized("Otp not found")
        }

        if (String(foundedUser.otp) !== String(otp)) {
            throw CustomErrorhandler.UnAuthorized("Wrong otp")
        }

        if (foundedUser.otpTime < Date.now()) {
            throw CustomErrorhandler.UnAuthorized("Otp expired")
        }

        await AuthSchema.findByIdAndUpdate(foundedUser._id, { otp: "", otpTime: 0 })

        const accessToken = access_token({ id: foundedUser._id, role: foundedUser.role, email: foundedUser.email })
        const refreshToken = refresh_token({ id: foundedUser._id, role: foundedUser.role, email: foundedUser.email })

        await AuthSchema.findByIdAndUpdate(foundedUser._id, { refreshToken })

        res.cookie("refresh_token", refreshToken, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true, // XSS(CROSS SITE-SCRIPTING)
            secure: true, // https 
            sameSite: "strict" //boshqa domainlar uchun yopadi
        })

        res.status(200).json({
            message: "Success",
            accessToken
        })


    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        // ma'lumotlarni olish
        const { email, password } = req.body

        // foydalanuvchi bor yoki yo'qligini tekshirish
        const foundedUser = await AuthSchema.findOne({ email })
        if (!foundedUser) {
            throw CustomErrorhandler.BadRequest("User not found")
        }

        // Tekshirish va token berish
        const check = await bcrypt.compare(password, foundedUser.password)

        logger.info("Login OTP issued", { email })


        if (check) {
            const code = +Array.from({ length: 6 }, () => Math.round(Math.random() * 6)).join("")

            await sendMessaege(code, email)

            await AuthSchema.findByIdAndUpdate(foundedUser._id, {
                otp: code,
                otpTime: Date.now() + 120000
            })

            res.status(201).json({ message: "Please check your email" });
        } else {
            throw CustomErrorhandler.UnAuthorized("Wrong OTP")
        }


    } catch (error) {
        next(error)
    }
}




module.exports = {
    register,
    varify,
    login,
}