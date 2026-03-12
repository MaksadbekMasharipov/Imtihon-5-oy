const { Router } = require("express")
const { get_one_car, addCar, deleteCar, updateCar, saveCar, getSavedCars, deleteSavedCar } = require("../controller/car.controller")
const carValidatorMiddleware = require("../middleware/car.validator=.middleware")
const authorization = require("../middleware/authorization")
const { uploadCarImage } = require("../middleware/upload.middleware")

const carRouter = Router()



carRouter.get("/car/:id", get_one_car)
carRouter.post("/add_car", authorization, uploadCarImage.single("imageUrl"), carValidatorMiddleware, addCar)
carRouter.put("/update_car/:id", authorization, uploadCarImage.single("imageUrl"), updateCar)
carRouter.delete("/delete_car/:id", authorization, deleteCar)
carRouter.post("/save_car/:id", authorization, saveCar)
carRouter.get("/saved_cars", authorization, getSavedCars)
carRouter.delete("/delete_saved/:id", authorization, deleteSavedCar)

module.exports = carRouter