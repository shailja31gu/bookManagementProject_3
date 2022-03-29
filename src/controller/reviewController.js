const reviewModel = require('../model/reviewModel')
 const bookModel = require('../model/bookModel')



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

  module.exports.deleteReview=deleteReview





