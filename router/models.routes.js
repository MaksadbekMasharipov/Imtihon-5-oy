const { Router } = require("express")
const { addModel, getAllmodels, get_one_model, deleteModel } = require("../controller/models.controller")
const modelsValidatorMiddleware = require("../middleware/models.validator.middleware")
const authorization = require("../middleware/authorization")
const { uploadModelImage } = require("../middleware/upload.middleware")

const modelsRouter = Router()

// get_all bosh sahifa, mavjud modellar
modelsRouter.get("/bosh_sahifa", getAllmodels)

// bitta model va unga tegishli mashinalar
modelsRouter.get("/models/:id", get_one_model)

// admin routes
modelsRouter.post("/add_model", authorization, uploadModelImage.single("imageUrl"), modelsValidatorMiddleware, addModel)
modelsRouter.delete("/delete_model/:id", authorization, deleteModel)

module.exports = modelsRouter