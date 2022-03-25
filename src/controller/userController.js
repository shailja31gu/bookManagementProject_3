const userModel = require("../model/userModel")

const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value) === "string" && (value).trim().length > 0) { return true }
}

const register = async (req, res) => {

    try {

    let data = req.body
    if (!Object.keys(data).length > 0) {
        return res.status(400).send({ error: "Please enter some data" })
    }

    const { title, name, phone, email, password, address } = data

    if (!isValid(title)) {
        return res.status(400).send({ error: "Title is required" })
    }

    if (!isValid(name)) {
        return res.status(400).send({ error: "Name is required" })
    }

    if (!isValid(phone)) {
        return res.status(400).send({ error: "Contact number is required" })
    }

    if (!isValid(email)) {
        return res.status(400).send({ error: "emailId is required" })
    }

    if (!isValid(password)) {
        return res.status(400).send({ error: "Password is required" })
    }

    // if (!isValid(address)) {
    //     return res.status(400).send({ error: "Address is required" })
    // }

    let Email = data.email
    let validateEmail = function (Email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email);
    }
    if (!validateEmail(Email)) {
        return res.status(400).send({error: "Please enter a valid email" })
    }

    const Mobile = phone
    const validateMobile = function(Mobile){
        return /^([+]\d{2})?\d{10}$/.test(Mobile)
    }
    if(!validateMobile(Mobile)){
        return res.status(400).send({error:"Please enter valid mobile"})
    }

    const Password = password
    const validatePassword = function(Password){
        return /^.{8,15}$/.test(Password)
    }
    if(!validatePassword(Password)){
        return res.status(400).send({error:"Password length must be between 8 to 15 characters"})
    }

    const emailAlreadyUsed = await userModel.findOne({email})

    if(emailAlreadyUsed) return res.status(400).send({status: false, msg: "email already registered"})

    
    const mobileAlreadyUsed = await userModel.findOne({phone})

    if(mobileAlreadyUsed) return res.status(400).send({status: false, msg: "mobile already registered"})

    let createdUser = await userModel.create(data)

    res.status(201).send({ status: true, msg: createdUser })

}
catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
}
module.exports.register = register