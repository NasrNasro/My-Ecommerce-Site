const express=require('express')
const isAuth=require('../middlewares/isAuth')
const isAdmin=require('../middlewares/isAdmin')
const upload = require('../middlewares/upload')
const User=require('../models/User')
const router=express.Router()

// update profile image
router.put('/update', isAuth, upload.single("myImage"), async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.user.id, {$set: {imageUrl:req.file.filename}, })
        res.send('image uploaded')
    } catch (error) {
        res.status(500).send("server error")
    }
})

// get profiles
router.get('/', isAuth, isAdmin, async(req,res)=>{
    try {
        const profiles=await User.find()
        res.status(200).send({msg:'List of profiles', profiles})
    } catch (error) {
        res.status(500).send("server error")
    }
})

// delete profile
router.delete('/deleteProfile/:id', isAuth, isAdmin, async(req,res)=>{
    const {id}=req.params
    try {
        await User.findByIdAndDelete(id)
        res.status(200).send({msg:'profile deleted'})
    } catch (error) {
        res.status(500).send('could not delete contact')
    }
})
module.exports=router