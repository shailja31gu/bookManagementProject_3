const mongoose = require('mongoose')

const bookModel = require("../model/bookModel")
const userModel = require('../model/userModel')

const isValid = function(value){
    if(typeof value === 'undefined'|| value ===  null) return false
    if(typeof value === 'string' && value.trim().length ===0) return false
    return true;
  }
  
  const isValidObjectId = function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValidRequestBody= function (requestBody){
    return Object.keys(requestBody).length>0
  }



  let createBook = async function(req, res){


    try{
        const requestBody =req.body;
        if(!isValidRequestBody(requestBody)){
            res.status(400).send({status:false,msg:'please provide book details'})
            return
        }

        // validation params
    
        const{ title, excerpt, userId, ISBN, category, subcategory}= requestBody
   
        // validation start

        
        if(!isValid(title)) {
            res.status(400).send({status:false, message:'book title is required'})
            return
          }

        if(!isValid(excerpt)) {
            res.status(400).send({status:false, message:'excerpt is required'})
            return
          }  
       
        if(!isValid(userId)) {
            res.status(400).send({status:false, message:'user id is required'})
            return
          } 
          
          if(!isValidObjectId(userId)) {
            res.status(400).send({status:false, message:'${userId} is not a valid userr id '})
            return
          }  

        if(!isValid(ISBN)) {
            res.status(400).send({status:false, message:'ISBN is required'})
            return
          }

        if(!isValid(category)) {
            res.status(400).send({status:false, message:'category is required'})
            return
          }

        if(!isValid(subcategory)) {
            res.status(400).send({status:false, message:'subcategory is required'})
            return
          }

        //   validation ends
        let user=await userModel.findById(userId)
        if(!user){
          res.status(404).send({status:false,msg:"user not found"})
        }
       
        let titleUsed = await bookModel.findOne({title})
         if (titleUsed){
           return res.status(400).send({status:false,msg:"title already used"})
         }

         let IsbnUsed = await bookModel.findOne({ISBN})
         if (IsbnUsed){
           return res.status(400).send({status:false,msg:"isbn already used"})
         }

        const newBook = await bookModel.create(requestBody)
        res.status(201).send({status:true, data:newBook})
    } catch(err){
        res.status(500).send({ status: false, message: err.message })
    }
  }
    module.exports.createBook= createBook;
  
  