const { Schema, model } = require("mongoose");

const Models = new Schema({
    name: {
        type: String,
        required: [true, "Nom berilishi shart"],
        set: (value) => value.trim(),   // Bo'sh joylarni olib tashlaydi
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true
})

const ModelsSchema = model("models", Models)
module.exports = ModelsSchema