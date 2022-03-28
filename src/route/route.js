const express = require("express")

const userController = require("../controller/userController")
const bookController = require("../controller/bookController")

const router = express.Router()


router.post("/register", userController.register)

router.post("/login", userController.login)

router.post('/books',bookController.createBook)

router.get("/books/:bookId",bookController.getBooks)

module.exports = router;

