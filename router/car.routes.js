const { Router } = require("express")
const { get_one_car, addCar, deleteCar, updateCar } = require("../controller/car.controller")

const carRouter = Router()

carRouter.get("/car/:id", get_one_car)
carRouter.post("/add_car", addCar) 
carRouter.put("/update_car", updateCar)
carRouter.delete("/delete_car", deleteCar )

module.exports = carRouter