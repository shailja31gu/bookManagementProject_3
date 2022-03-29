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


const deleteReview = async(req,res) => {
    try{
        const{reviewId,bookId} = req.params
        if(!reviewId){
            return res.status(404).send({status:false,msg:'enter review ID'})
        }
        if(!bookId){
            return res.status(404).send({status:false,msg:'enter book ID'})
        }   
        const review = await reviewModel.findById(reviewId)
        if(!review){
            return res.status(404).send({status:false,msg:'review not found'})
        }
        const book = await bookModel.findById(bookId)
        if(!book){
            return res.status(404).send({status:false,msg:'book not found'})
        }
        if(review.isDeleted == true){
            return res.status(404).send({status:false,msg:'review already deleted'})
        }
        if(book.isDeleted == true){
            return res.status(404).send({status:false,msg:'book already deleted'})
        }
        const delReview = await reviewModel.findByIdAndUpdate(reviewId,{isDeleted: true},{new:true})
        await bookModel.findByIdAndUpdate({_id: bookId}, {$inc: {reviews: -1}})
        return res.status(200).send({status:true,data:delReview})

    }catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
}


module.exports.createReview = createReview
module.exports.deleteReview=deleteReview





