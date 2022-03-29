const jwt = require("jsonwebtoken");
const bookModel = require("../model/bookModel");

const authorisation = async function (req, res, next) {
    try {
      let token = req.headers["x-api-key"];
      let decodedToken = jwt.verify(token, "projectthreebook");
      let userLoggingIn = req.params.bookId
      let userLoggedIn = decodedToken.userId
      let value = await bookModel.findById(userLoggingIn)
      if (value.userId != userLoggedIn) return res.send({ status: false, msg: "You are not allowed to modify requested book data" })
    }
    catch (err) {
      console.log(err)
      res.status(500).send({ msg: err.message })
    }
    next()
  
  }

  module.exports.authorisation = authorisation