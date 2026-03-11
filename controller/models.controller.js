const ModelsSchema = require("../schema/models.schema")
const CarSchema = require("../schema/car.schema")

const getAllmodels = async (req, res) => {
    try {
        const models = await ModelsSchema.find()

        return res.status(200).json(models)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const get_one_model = async (req, res) => {
    try {
        const { id } = req.params
        const foundedModel = await ModelsSchema.findById(id)

        if (!foundedModel) {
            return res.status(404).json({
                message: "model not found"
            })
        }

        const cars = await CarSchema.find({ marka: foundedModel.name })
            .select("name imageUrl price")

        return res.status(200).json({
            model: foundedModel,
            cars
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const addModel = async (req, res) => {
    try {
        const { name, imageUrl } = req.body

        const newModel = await ModelsSchema.create({
            name,
            imageUrl
        })

        return res.status(201).json(newModel)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const deleteModel = async (req, res) => {
    try {
        const { id } = req.params
        const deletedModel = await ModelsSchema.findByIdAndDelete(id)

        if (!deletedModel) {
            return res.status(404).json({
                message: "model not found"
            })
        }

        return res.status(200).json(deletedModel)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    getAllmodels,
    get_one_model,
    addModel,
    deleteModel
}