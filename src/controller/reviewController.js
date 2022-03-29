const reviewModel = require("../model/reviewModel")
const bookModel = require("../model/bookModel")

const updateReview = async (req,res)=>{
    try {
    let data = req.body
    let bkId = req.params.bookId
    let rvId = req.params.reviewId

    if(!bkId) return res.status(400).send({msg:"Please enter bookId"})

    if(!rvId) return res.status(400).send({msg:"Please enter reviewId"})

    if (!Object.keys(data).length > 0) return res.status(400).send({msg:"Please enter data for updation"})

    const bookPresent = await bookModel.findById({_id:bkId})

    if(!bookPresent) return  res.status(404).send({status:false, message:"Book not found"})

    if(bookPresent.isDeleted==true) return  res.status(400).send({status:false, message:"Book is Deleted"})

    const updates = { ...data}

    const review = await reviewModel.findById({_id:rvId})

    if(!review) return res.status(404).send({status:false, message:"review not found"})

    if(review.isDeleted==true) return res.status(400).send({status:false, message:"review is deleted"})

    const update = await reviewModel.findOneAndUpdate({ _id: rvId}, { $set: updates }, { new: true })


    return res.status(200).send({status:true, message: update })
}
catch(e){
    return res.status(500).send({ status: false, msg: e.message })
}
}

module.exports.updateReview = updateReview