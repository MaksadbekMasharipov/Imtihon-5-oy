const { Schema, model } = require("mongoose");

const Car = new Schema({
    name: {
        type: String,
        required: true,
        set: (value) => value && value.trim(),   // Bo'sh joylarni olib tashlaydi
    },
    price: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    marka: {
        type: String,
        required: true,
    },
    tanirovka: {
        type: String,
        required: true,
    },
    motor: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    gearBook: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    umumiyXarajat: {
        type: String,
        required: true,
    },
},  {
    versionKey: false,
    timestamps: true
})

const CarSchema = model("car", Car)
module.exports = CarSchema