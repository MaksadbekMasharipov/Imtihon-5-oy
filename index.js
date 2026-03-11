const express = require("express")
const cors = require("cors")
const path = require("path")
const modelsRouter = require("./router/models.routes");
const carRouter = require("./router/car.routes");
const connectDb = require("./config/db.config");
const authRouter = require("./router/auth.routes");
const errorMiddleware = require("./middleware/error.middleware");
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

connectDb()
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use(modelsRouter)
app.use(carRouter)
app.use(authRouter)

// Custom error handler 
app.use(errorMiddleware)


app.listen(PORT, () => {
    console.log("Server is running at: " + PORT);
})
