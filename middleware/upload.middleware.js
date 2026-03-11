const fs = require("fs")
const path = require("path")
const multer = require("multer")
const CustomErrorhandler = require("../error/custom-error.handler")

const allowedMimeTypes = new Set([
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
])

const createStorage = (folderName) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadDir = path.join(__dirname, "..", "uploads", folderName)
            fs.mkdirSync(uploadDir, { recursive: true })
            cb(null, uploadDir)
        },
        filename: (req, file, cb) => {
            const extension = path.extname(file.originalname).toLowerCase()
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`
            cb(null, uniqueName)
        }
    })
}

const imageFilter = (req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
        return cb(CustomErrorhandler.BadRequest("Faqat rasm fayli yuklash mumkin (jpg, jpeg, png, webp)"), false)
    }

    return cb(null, true)
}

const createUploader = (folderName) => {
    return multer({
        storage: createStorage(folderName),
        fileFilter: imageFilter,
        limits: {
            fileSize: 5 * 1024 * 1024,
        }
    })
}

module.exports = {
    uploadCarImage: createUploader("cars"),
    uploadModelImage: createUploader("models"),
}
