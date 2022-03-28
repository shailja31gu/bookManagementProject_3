const bookModel = require("../model/bookModel")

const getBook = async (req, res) => {
    // const filterKeys = ["userId", "category", "subcategory"]
    try{
        const data = req.query
        const filter = {
            isDeleted: false,
            ...data
        }
        const books = await bookModel.find(filter).select({"title": 1,"excerpt": 1,"userId": 1,"category":1,"reviews": 1,"releasedAt": 1})
        if(books.length === 0){
            return res.status(404).send({status: true, message: "no book founds"})
        }
        // if(books.length == 1){
        //     if(!filterKeys.includes(Object.keys(data)[0])){
        //         return res.status(404).send({status: true, message: `can not filter using (${Object.keys(data)[0]}) query`})
        //     }
        // }
        return res.status(200).send({status: true, message: "Books list", data: books})
    }catch(e){
        return res.status(500).send({status: false, message: e.message})
    }
}

const deleteBook = (req)

module.exports.getBook = getBook;