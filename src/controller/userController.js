const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")


const login = async (req, res) => {
    const {email, password} = req.body
    if (!email){
        return res.status(400).send({status: false, message: "please enter email"})
    }
    if (!password){
        return res.status(400).send({status: false, message: "please enter password"})
    }
    try{
        const user = await userModel.findOne({email: email, password: password})
        if (!user){
            return res.status(400).send({status: false, message: "user not found"})
        }
        const token = jwt.sign({id: user._id}, "projectthreebook")
        // res.setheaders("x-auth-token", token)
        return res.status(200).send({status: true, token: token})
    }catch(e){
        return res.status(500).send({status: false, message: e.message})
    }
}



module.exports.login = login