const express = require("express")

const userContrller = require("../controller/userController")

const router = express.Router()


router.post("/login", userContrller.login)



module.exports = router

