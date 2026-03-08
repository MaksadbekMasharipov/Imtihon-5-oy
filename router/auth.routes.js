const { Router } = require("express")
const { register, varify, login, logout, addProfileInfo, updateProfileInfo, deleteProfileInfo } = require("../controller/auth.controller")
const authorization = require("../middleware/authorization")


const authRouter = Router()

authRouter.post("/register", register )
authRouter.post("/verify", varify )
authRouter.post("/login", login )
authRouter.get("/logout", authorization, logout )



module.exports = authRouter 