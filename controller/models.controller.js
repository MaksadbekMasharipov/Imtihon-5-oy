const ModelsSchema = require("../schema/models.schema")

const getAllmodels = async (req, res) => {
    try {
        const models = await ModelsSchema.find()

        res.status(200).json(models)
    } catch (error) {
        res.status(200).json({
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

        res.status(201).json(newModel);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteModel = async (req, res) => {
    try {
        const { id } = req.params
        const deletedModel = await ModelSchema.findByIdAndDelete(id);

        if (!deletedModel) {
            res.status(404).json({
                message: "Car not found"
            })
        }

        res.status(200).json(deletedModel);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    getAllmodels,
    addModel,
    deleteModel
}