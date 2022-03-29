const reviewModel = require("../model/reviewModel")
const bookModel = require("../model/bookModel")
const moment = require("moment")


let validateRating = function (rating) {
    return /^[12345]$/.test(rating);
}

const createReview = async (req, res) => {
    try {
        const data = req.body
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "please fill all required feilds" })
        }
        const { bookId } = req.params
        if (!bookId) {
            return res.status(400).send({ status: false, msg: "please give book id in params" })
        }
        const book = await bookModel.findById(bookId)
        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }
        if (book.isDeleted == true) {
            return res.status(404).send({ status: false, message: "Book is deleted" })
        }
        data.rating = Number(data.rating)
        if (!validateRating(data.rating)) {
            return res.status(400).send({ error: "Please enter a rating, between 1 t0 5" })
        }
        data.reviewedAt = moment().format()
        data.bookId = bookId
        const review = await reviewModel.create(data)
        await bookModel.findByIdAndUpdate({ _id: bookId }, { $inc: { reviews: 1 } })
        return res.status(201).send({ status: true, message: "success", data: review })
    } catch (e) {
        return res.status(500).send({ status: false, msg: e.message })
    }
}

const updateReview = async (req, res) => {
    try {
        let data = req.body
        let bkId = req.params.bookId
        let rvId = req.params.reviewId

        if (!bkId) return res.status(400).send({ msg: "Please enter bookId" })

        if (!rvId) return res.status(400).send({ msg: "Please enter reviewId" })

        if (!Object.keys(data).length > 0) return res.status(400).send({ msg: "Please enter data for updation" })

        const bookPresent = await bookModel.findById({ _id: bkId })

        if (!bookPresent) return res.status(404).send({ status: false, message: "Book not found" })

        if (bookPresent.isDeleted == true) return res.status(400).send({ status: false, message: "Book is Deleted" })

        if (data.rating) {
            data.rating = Number(data.rating)
            if (!validateRating(data.rating)) {
                return res.status(400).send({ error: "Please enter a rating, between 1 t0 5" })
            }
        }
        const updates = { ...data }

        const review = await reviewModel.findById({ _id: rvId })

        if (!review) return res.status(404).send({ status: false, message: "review not found" })

        if (review.isDeleted == true) return res.status(400).send({ status: false, message: "review is deleted" })

        const update = await reviewModel.findOneAndUpdate({ _id: rvId }, { $set: updates }, { new: true })


        return res.status(200).send({ status: true, message: update })
    }
    catch (e) {
        return res.status(500).send({ status: false, msg: e.message })
    }
}

const deleteReview = async (req, res) => {
    try {
        const { reviewId, bookId } = req.params
        if (!reviewId) {
            return res.status(404).send({ status: false, msg: 'enter review ID' })
        }
        if (!bookId) {
            return res.status(404).send({ status: false, msg: 'enter book ID' })
        }
        const review = await reviewModel.findById(reviewId)
        if (!review) {
            return res.status(404).send({ status: false, msg: 'review not found' })
        }
        const book = await bookModel.findById(bookId)
        if (!book) {
            return res.status(404).send({ status: false, msg: 'book not found' })
        }
        if (review.isDeleted == true) {
            return res.status(404).send({ status: false, msg: 'review already deleted' })
        }
        if (book.isDeleted == true) {
            return res.status(404).send({ status: false, msg: 'book already deleted' })
        }
        const delReview = await reviewModel.findByIdAndUpdate(reviewId, { isDeleted: true }, { new: true })
        await bookModel.findByIdAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } })
        return res.status(200).send({ status: true, data: delReview })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createReview = createReview
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview





