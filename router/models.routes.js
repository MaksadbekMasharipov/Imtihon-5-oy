const { Router } = require("express")
const { addModel, getAllmodels } = require("../controller/models.controller")
const { deleteModel } = require("mongoose")

const modelsRouter = Router()

modelsRouter.get("/bosh_sahifa", getAllmodels )
modelsRouter.post("/add_model", addModel ) // name and imageUrl
modelsRouter.delete("/delete_model", deleteModel )

module.exports = modelsRouter