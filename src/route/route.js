const express = require("express")

const userController = require("../controller/userController")
const bookController = require("../controller/bookController")

const router = express.Router()

// user
router.post("/register", userController.register)

router.post("/login", userController.login)

// book
router.post('/books',bookController.createBook)

router.get("/books", bookController.getBook)

router.get("/books/:bookId",bookController.getBooks)

router.delete("/books/:bookId", bookController.deleteBook)

module.exports = router;

