const bookModel = require("../model/bookModel")
const reviewModel = require("../model/reviewModel")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}



let createBook = async function (req, res) {


    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, msg: 'please provide book details' })
            return
        }

        // validation params

        const { title, excerpt, userId, ISBN, category, subcategory } = requestBody

        // validation start


        if (!isValid(title)) {
            res.status(400).send({ status: false, message: 'book title is required' })
            return
        }

        if (!isValid(excerpt)) {
            res.status(400).send({ status: false, message: 'excerpt is required' })
            return
        }

        if (!isValid(userId)) {
            res.status(400).send({ status: false, message: 'user id is required' })
            return
        }

        if (!isValidObjectId(userId)) {
            res.status(400).send({ status: false, message: '${userId} is not a valid userr id ' })
            return
        }

        if (!isValid(ISBN)) {
            res.status(400).send({ status: false, message: 'ISBN is required' })
            return
        }

        if (!isValid(category)) {
            res.status(400).send({ status: false, message: 'category is required' })
            return
        }

        if (!isValid(subcategory)) {
            res.status(400).send({ status: false, message: 'subcategory is required' })
            return
        }

        //   validation ends
        let user = await userModel.findById(userId)
        if (!user) {
            res.status(404).send({ status: false, msg: "user not found" })
        }

        let titleUsed = await bookModel.findOne({ title })
        if (titleUsed) {
            return res.status(400).send({ status: false, msg: "title already used" })
        }

        let IsbnUsed = await bookModel.findOne({ ISBN })
        if (IsbnUsed) {
            return res.status(400).send({ status: false, msg: "isbn already used" })
        }

        const newBook = await bookModel.create(requestBody)
        res.status(201).send({ status: true, data: newBook })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const getBooks = async (req, res) => {

    try {

        const data = req.params
        const id = data.bookId
        if (!data) return res.status(400).send({ error: "enter Book id" })

        const isPresent = await bookModel.findById({ _id: id })

        if (!isPresent) return res.status(404).send({ error: "Book not found" })

        const book = await bookModel.findById({ _id: id, isDeleted: false })

        if (!book) return res.status(400).send({ error: "Book is deleted" })

        const reviews = await reviewModel.find({ bookId: id })

        const obj = {
            _id: book._id,
            title: book.title,
            excerpt: book.excerpt,
            userId: book.userId,
            category: book.category,
            subcategory: book.subcategory,
            deleted: book.deleted,
            reviews: book.reviews,
            deletedAt: book.deletedAt,
            releasedAt: book.releasedAt,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
            reviewsData: reviews
        }

        res.status(200).send({ status: true, message: "Book list", data: obj })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}




module.exports.getBooks = getBooks
module.exports.createBook = createBook;
// module.exports.updateBook = updateBook;


