const { Router } = require("express")
const { addModel, getAllmodels } = require("../controller/models.controller")
const { deleteModel } = require("mongoose")
const modelsValidatorMiddleware = require("../middleware/models.validator.middleware")
const authorization = require("../middleware/authorization")

const modelsRouter = Router()

modelsRouter.get("/bosh_sahifa", getAllmodels )
modelsRouter.post("/add_model", authorization, modelsValidatorMiddleware, addModel ) // name and imageUrl
modelsRouter.delete("/delete_model", authorization,  deleteModel )

module.exports = modelsRouter