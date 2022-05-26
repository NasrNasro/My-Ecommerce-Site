const User = require("../models/User")

const isAdmin=async(req,res,next)=>{
    const user=await User.findById(req.user.id)
    try {
        if (user.role!=="admin"){
            return res.status(401).send({errors: [{msg:"You are not authorized"}]})
        }
        next()
    } catch (error) {
        res.status(401).send({errors: [{msg:"You are not authorized"}]})
    }
}
module.exports=isAdmin