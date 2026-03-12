const CarSchema = require("../schema/car.schema")
const ModelsSchema = require("../schema/models.schema")
const AuthSchema = require("../schema/auth.schema")

const get_one_car = async (req, res) => {
    try {
        const { id } = req.params
        const car = await CarSchema.findById(id).populate("createdBy", "username email")

        if (!car) {
            return res.status(404).json({
                message: "car not found"
            })
        }

        return res.status(200).json(car)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const foundedCar = await CarSchema.findById(id)

        if (!foundedCar) {
            return res.status(404).json({
                message: "car not found"
            })
        }

        // Agar file yuborilsa, imageUrl'ni fayldan o'zlashtir
        if (req.file) {
            req.body.imageUrl = `/uploads/cars/${req.file.filename}`
        }

        const {
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
            umumiyXarajat,
        } = req.body

        const updatePayload = {
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
            umumiyXarajat,
        }

        Object.keys(updatePayload).forEach((key) => {
            if (updatePayload[key] === undefined) {
                delete updatePayload[key]
            }
        })

        const updatedCar = await CarSchema.findByIdAndUpdate(id, updatePayload, {
            new: true,
            runValidators: true
        })

        return res.status(200).json(updatedCar)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const addCar = async (req, res) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                message: "user not authorized"
            })
        }

        const {
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
            umumiyXarajat,
        } = req.body

        const foundedModel = await ModelsSchema.findOne({ name: marka })

        if (!foundedModel) {
            return res.status(404).json({
                message: "model topilmadi yoki noto'g'ri kiritildi, iltimos oldin model qo'shing yoki model nomini to'g'ri kiriting"
            })
        }

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
            umumiyXarajat,
            createdBy: userId,
        })

        return res.status(201).json(newCar)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCar = await CarSchema.findByIdAndDelete(id);

        if (!deletedCar) {
            return res.status(404).json({
                message: "car not found"
            })
        }

        return res.status(200).json(deletedCar)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const saveCar = async (req, res) => {
    try {
        // ma'lumotlarni olish va tekshiruv
        const { id } = req.params

        // JWTdan o'tgan idni olish
        const userId = req.user?.id

        if (!userId) {
            return res.status(401).json({
                message: "user not authorized"
            })
        }

        const foundedCar = await CarSchema.findById(id)
        if (!foundedCar) {
            return res.status(404).json({
                message: "car not found"
            })
        }

        // bazadan qidiradi bor yoki yo'q
        const user = await AuthSchema.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        // oldin save qilgan bo'lsa qo'shmaydi
        const savedCars = user.savedCars || []
        const alreadySaved = savedCars.some((carId) => carId.toString() === id)
        if (alreadySaved) {
            return res.status(200).json({
                message: "car already saved"
            })
        }

        // qo'shib va saqlab qo'yish
        user.savedCars = [...savedCars, foundedCar._id]
        await user.save()

        // javob yuborish
        return res.status(201).json({
            message: "car saved successfully",
            savedCarId: foundedCar._id
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const getSavedCars = async (req, res) => {
    try {
        // ma'lumotlarni olish va tekshirish
        const userId = req.user?.id

        if (!userId) {
            return res.status(401).json({
                message: "user not authorized"
            })
        }

        // userni tekshirish va mashinalarni olish
        const user = await AuthSchema.findById(userId).populate({
            path: "savedCars",
            select: "name imageUrl price marka year color"
        })

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        // berib yuborish
        return res.status(200).json(user.savedCars)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const deleteSavedCar = async (req, res) => {
    try {
        // ma'lumotlarni olish va tekshirish
        const userId = req.user?.id
        const { id } = req.params

        if (!userId) {
            return res.status(401).json({
                message: "user not authorized"
            })
        }

        const user = await AuthSchema.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        // savedCars'dan mashinani olib tashla
        user.savedCars = user.savedCars.filter((carId) => carId.toString() !== id)
        await user.save()

        return res.status(200).json({
            message: "car removed from saved cars",
            remainingCars: user.savedCars
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    get_one_car,
    addCar,
    updateCar,
    deleteCar,
    saveCar,
    getSavedCars,
    deleteSavedCar,
}