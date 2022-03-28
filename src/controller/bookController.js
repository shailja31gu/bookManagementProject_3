const bookModel = require("../model/bookModel")
const reviewModel = require("../model/reviewModel")

const getBooks = async (req,res) =>{

    try {

    const data = req.params
    const id = req.params.bookId

    if(!id)  return res.status(400).send({error:"enter Book id"})

    const book = await bookModel.findOne({_id:id, isDeleted:false})

    if(!book) return res.status(400).send({error:"Book is deleted"})

    const isPresent = await bookModel.findOne({data})

    if(!isPresent) return res.status(404).send({error:"Book not found"})

    const reviews = await reviewModel.find({bookId:id})

    const obj = {
        _id: book._id,
        title: book.title,
        excerpt:book.excerpt,
        userId:book.userId,
        category:book.category,
        subcategory:book.subcategory,
        deleted:book.deleted,
        reviews:book.reviews,
        deletedAt:book.deletedAt,
        releasedAt:book.releasedAt,
        createdAt:book.createdAt,
        updatedAt:book.updatedAt,
        reviewsData: reviews
    }

    res.status(200).send({status:true, message:"Book list", data:obj})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getBooks = getBooks