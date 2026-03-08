const { Router } = require("express")
const { get_one_car, addCar, deleteCar, updateCar } = require("../controller/car.controller")
const carValidator = require("../validator/car.validate")
const carValidatorMiddleware = require("../middleware/car.validator=.middleware")
const authorization = require("../middleware/authorization")

const carRouter = Router()

carRouter.get("/car/:id", get_one_car)
carRouter.post("/add_car", authorization, carValidatorMiddleware, addCar) 
carRouter.put("/update_car", authorization, updateCar)
carRouter.delete("/delete_car", authorization, deleteCar )

module.exports = carRouter