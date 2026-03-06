const ModelTurlariSchema = require("../schema/modelTurlari.schema")


const get_one_model = async (req, res) => {
    try {
        const { id } = req.params
        const cars = await ModelTurlariSchema.findById(id).populate("cars","name price imageUrl")

        res.status(200).json(cars)
    }catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const addModelTurlari = async (req, res) => {
    try {
        const { cars } = req.body

        const newModel = await ModelTurlariSchema.create({
            cars
        })

        res.status(201).json(newModel);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    get_one_model,
    addModelTurlari 
}