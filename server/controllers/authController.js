const User=require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp= async(req,res)=>{
    let {name,email,password}=req.body
    try {
        // check user exists
        const foundUSer=await User.findOne({email});
        if (foundUSer){
            return res.status(400).send({ errors: [{ msg: "user already exists" }] })
        }
        const user=new User({
            name,email,password
        })
        // hash password
        const salt=10
        user.password=await bcrypt.hash(password,salt);
        await user.save()
        // generate token
        const payload={
            id:user._id,
        }
        const token=jwt.sign(payload, process.env.secretOrKey,{expiresIn:'3d',});
        res.status(200).send({msg:"register with success",user,token})
    } catch (error) {
        res.status(500).send('server error')
    }
}
exports.signIn= async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if (!user){
            return res.status(400).send({ errors: [{ msg: "Bad credentials" }] });
        }
        const isMatch=await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).send({ errors: [{ msg: "Bad credentials" }] });
        }
        // generate token
        const payload={
            id:user._id,
        }
        const token=jwt.sign(payload, process.env.secretOrKey,{expiresIn:'3d',});
        res.status(200).send({msg:"login with success",user,token})
    } catch (error) {
        res.status(500).send('server error')
    }
}
exports.getCurrent= async(req,res)=>{
    try {
        const user=await User.findById(req.user.id)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send('server error')
    }
}