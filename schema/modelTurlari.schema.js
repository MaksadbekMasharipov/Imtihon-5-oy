const { Schema, model } = require("mongoose");

const ModelTurlari = new Schema({
    cars: [
        {
            type: Schema.Types.ObjectId,
            ref: "car"
        }
    ]

},{
    versionKey:false,
    timestamps:true
})

module.exports = model("modelTurlari", ModelTurlari)