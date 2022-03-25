const express = require("express")

const userContrller = require("../controller/userController")

const router = express.Router()


router.post("/login", userContrller.login)
router.post("/register", userContrller.register)

module.exports = router;

