const express = require("express")
const router = express.Router()
const Blog = require("../models/Blog")
const blogController = require ("../controllers/blogController")


router.post("/create", blogController.create)

router.get("/readall", blogController.readAll)

router.get("/readone/:id", blogController.readOne)

router.put("/edit/:id", blogController.edit)

router.delete("/delete/:id", blogController.delete)


module.exports = router