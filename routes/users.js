const express = require("express")
const router = express.Router()

const userController = require ("../controllers/usersController")
const authorization = require ("../middleware/authorization")


//crear usuario
router.post("/create", userController.create)

//iniciar sesión 
router.post("/login", userController.login)

//verificar usuario
router.get("/verifytoken", authorization, userController.verifyToken)


module.exports = router