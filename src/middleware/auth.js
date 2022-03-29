

const authentication = async function(req,res,next){
    try{
        let token =req.header["x-api-key"];
        console.log(token)
        if(!token)
       return res.status(400).send({status:false,msg:"importent header missing"})
        console.log(token)

        let decodedToken = jwt.varify(token,'projectthreebook')
        console.log(decodedToken)
        if(!decodedToken)
       return res.status(400).send({status:false, msg:'token is not valid'})

        
}catch(error){
     return res.status(500).send({status:false, msg:error.message})
}
next()
}

module.exports.authentication=authentication