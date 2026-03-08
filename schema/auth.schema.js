const { Schema, model } = require("mongoose");

const Auth = new Schema({
    username: {
        type: String,
        required: [true, "Username berilishi shart"],
        minLength: [3, "kamida 3 ta harfdan iborat bo'lishi kerak"],
        maxLength: [50, "ko'pi bilan 50 ta harfdan iborat bo'lishi kerak"],
        set: (value) => value.trim(),   // Bo'sh joylarni olib tashlaydi
    },
    email: {
        type: String,
        required: [true, "Email berilishi shart"],
    },
    password: {
        type: String,
        required: [true, "Password berilishi shart"],
    },
    role: {
        type: String,
        default: "user"
    },
    otp: {
        type: String,
        required: true,
    },
    otpTime: {
        type: Number,
        required: true,
    },
    refreshToken: {
        type: String,
    },


}, {
    versionKey: false,
    timestamps: true
})

const AuthSchema = model("auth", Auth)
module.exports = AuthSchema
