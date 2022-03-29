const moment = require("moment")
const bookModel = require("../model/bookModel")

const reviewModel = require("../model/reviewModel")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

let validateRating = function (rating) {
    return /^[12345]$/.test(rating);
}

const createReview = async (req, res) => {
    try{
        const data = req.body
        if (Object.keys(data).length === 0){
            return res.status(400).send({status: false, msg: "please fill all required feilds"})
        }
        const {bookId} = req.params
        if (!bookId){
            return res.status(400).send({status: false, msg: "please give book id in params"})
        }
        const book = await bookModel.findById(bookId)
        if (!book){
            return res.status(404).send({status: false, message: "Book not found" })
        }
        if (book.isDeleted == true){
            return res.status(404).send({status: false, message: "Book is deleted" })
        }
        data.rating = Number(data.rating)
        if (!validateRating(data.rating)) {
            return res.status(400).send({ error: "Please enter a rating, between 1 t0 5" })
        }
        data.reviewedAt = moment().format()
        data.bookId = bookId
        const review = await reviewModel.create(data)
        await bookModel.findByIdAndUpdate({_id: bookId}, {$inc: {reviews: 1}})
        return res.status(201).send({status: true,message: "success", data: review})
    }catch(e){
        return res.status(500).send({status: false, msg: e.message})
    }
}

module.exports.createReview = createReview