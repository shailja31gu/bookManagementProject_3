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

router.get("/bookss/:bookId",bookController.getBooks)

router.put("/books/:bookId",bookController.updateBook)

router.delete("/books/:bookId", bookController.deleteBook)


router.get("*", (req, res) => {
    return res.status(404).send({err:'page not found'})
})

module.exports = router;

