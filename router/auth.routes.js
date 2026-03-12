const { Router } = require("express")
const { register, varify, login} = require("../controller/auth.controller")
const authorization = require("../middleware/authorization")


const authRouter = Router()

authRouter.post("/register", register )
authRouter.post("/verify", varify )
authRouter.post("/login", login )




module.exports = authRouter 