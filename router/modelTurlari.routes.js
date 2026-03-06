const { Router } = require("express")
const { get_one_model, addModelTurlari } = require("../controller/modelTurlari.controller")


const modelTurlariRouter = Router()

modelTurlariRouter.get("/model/:id", get_one_model )
modelTurlariRouter.post("/add_models", addModelTurlari )

module.exports = modelTurlariRouter