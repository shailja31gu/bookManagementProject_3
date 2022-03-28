const express = require("express")

const userContrller = require("../controller/userController")
const bookContrller = require("../controller/bookController")

const router = express.Router()


router.post("/register", userContrller.register)

router.post("/login", userContrller.login)

router.get("/books/:bookId",bookContrller.getBooks)

module.exports = router;

