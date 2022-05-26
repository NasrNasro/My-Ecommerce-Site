const jwt = require('jsonwebtoken');

const isAuth=async(req,res,next)=>{
    const token=req.headers["authorization"]
    try {
        if(!token){
            res.status(401).send({errors: [{msg:"You are not authorized"}]})
        }
        const decoded=jwt.verify(token,process.env.secretOrKey)
        req.user={
            id:decoded.id
        }
        next()
    } catch (error) {
        res.status(401).send({errors: [{msg:"You are not authorized"}]})
    }
}
module.exports=isAuth