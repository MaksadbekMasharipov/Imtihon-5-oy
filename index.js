const express = require("express")
const cors = require("cors")
const modelTurlariRouter = require("./router/modelTurlari.routes");
const modelsRouter = require("./router/models.routes");
const carRouter = require("./router/car.routes");
const connectDb = require("./config/db.config");
const authRouter = require("./router/auth.routes");
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

connectDb()
app.use(express.json())
app.use(cors())

// Routes
app.use(modelsRouter)
app.use(modelTurlariRouter)
app.use(carRouter)
app.use(authRouter)


app.listen(PORT, () => {
    console.log("Server is running at: " + PORT);
})
