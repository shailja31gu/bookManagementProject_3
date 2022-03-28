const express = require("express")

const userContrller = require("../controller/userController")
const bookController = require("../controller/bookController")

const router = express.Router()

// user
router.post("/register", userContrller.register)

router.post("/login", userContrller.login)

// book
router.get("/books", bookController.getBook)

module.exports = router;

