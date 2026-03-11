const fs = require("fs")
const { createLogger, format, transports } = require("winston")
const { simple } = format
require("winston-mongodb")
require("dotenv").config()

if (!fs.existsSync("log")) {
    fs.mkdirSync("log", { recursive: true })
}

const logger = createLogger({
    level: "debug",
    format: simple(),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "log/all-logs.log" }),
        new transports.MongoDB({ db: process.env.MONGO_URI })
    ]
})

module.exports = logger

logger.warn("Console logger")
logger.error("Error logger")
logger.info("Info logger")
logger.debug("Debug logger")
