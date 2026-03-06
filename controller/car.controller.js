const CarSchema = require("../schema/car.schema")

const get_one_car = async (req, res) => {
    try {
        const { id } = req.params
        const car = await CarSchema.findById(id)

        res.status(200).json(car)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const { title, publishedYear, publishedHome, description, genre, pages, imageUrl, authorInfo, iqtibosInfo, audio } = req.body;

        const foundedCar = await CarSchema.findById(id)

        if (!foundedCar) {
            res.status(500).json({
                message: "car not found"
            })
        }

        await CarSchema.findByIdAndUpdate(id, { title, publishedYear, publishedHome, description, genre, pages, imageUrl, authorInfo, iqtibosInfo, audio })


        res.status(200).json(foundedCar);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const addCar = async (req, res) => {
    try {
        const { name, price, imageUrl, marka, tanirovka, motor, year, color, distance, gearBook, description, umumiyXarajat } = req.body

        const newCar = await CarSchema.create({
            name,
            price,
            imageUrl,
            marka,
            tanirovka,
            motor,
            year,
            color,
            distance,
            gearBook,
            description,
            umumiyXarajat
        })

        res.status(201).json(newCar);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCar = await CarSchema.findByIdAndDelete(id);

        if (!deletedCar) {
            res.status(500).json({
                message: "car not found"
            })
        }

        res.status(200).json(deletedCar);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    get_one_car,
    addCar,
    updateCar,
    deleteCar
}