const express = require ("express")
const router = express.Router()
const merchController = require ("../controllers/merchController")


router.post("/create", merchController.create)

router.get("/readall", merchController.readAll)

router.get("/readone/:id", merchController.readOne)

router.put("/edit/:id", merchController.edit)

router.delete("/delete/:id", merchController.delete)

module.exports = router