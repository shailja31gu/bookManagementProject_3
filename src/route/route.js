const express = require("express")

const userController = require("../controller/userController")
const bookController = require("../controller/bookController")
const reviewModel = require("../controller/reviewController")
const mw = require("../middleware/auth")

const router = express.Router()

// user
router.post("/register", userController.register)

router.post("/login", userController.login)

// book
router.post('/books',mw.authentication,bookController.createBook)

router.get("/books",mw.authentication, bookController.getBook)

router.get("/bookss/:bookId",mw.authentication, mw.authorisation, bookController.getBooks)

router.put("/books/:bookId",mw.authentication, mw.authorisation,bookController.updateBook)

router.delete("/books/:bookId",mw.authentication, mw.authorisation, bookController.deleteBook)

// review
router.post("/books/:bookId/review", reviewModel.createReview)

router.get("*", (req, res) => {
    return res.status(404).send({err:'page not found'})
})

module.exports = router;

