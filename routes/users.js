const express = require("express")
const router = express.Router()

const userController = require ("../controllers/usersController")
const authorization = require ("../middleware/authorization")


//crear usuario
router.post("/signup", userController.create)

//iniciar sesión 
router.post("/login", userController.login)

//verificar usuario
router.get("/verifytoken", authorization, userController.verifyToken)

//Editar datos de usuario
router.put("/editprofile/:id", userController.editUser);



module.exports = router