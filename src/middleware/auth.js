const jwt = require("jsonwebtoken");
const bookModel = require("../model/bookModel");


const authentication = async (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];
        if (!token){
            return res.status(401).send({ status: false, message: "important header missing" })
        }
        let decodedToken = jwt.verify(token, 'projectthreebook')
        if (!decodedToken)
            return res.status(401).send({ status: false, message: 'token is not valid' })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
    next()
}

const authorisation = async (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "projectthreebook");
        let userLoggingIn = req.params.bookId
        let userLoggedIn = decodedToken.id)
        if (value.userId != userLoggedIn) 
        return res.sen
        let value = await bookModel.findById(userLoggingInd({ status: false, message: "You are not allowed to modify requested book data" })
    }
    catch (error) {
        return res.status(500).send({status: false, message: error.message })
    }
    next()
}


module.exports.authentication = authentication
module.exports.authorisation = authorisation
