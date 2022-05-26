const express=require('express')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const Order=require('../models/Order')
const router=express.Router()

// add order
router.post('/addOrder', isAuth, async(req,res)=>{
    try {
        const newOrder=new Order({...req.body, userId:req.user.id})
        await newOrder.save()
        res.status(200).send({msg:'order added', newOrder})
    } catch (error) {
        res.status(500).send('could not add order')
    }
})
router.get('/', isAuth, isAdmin, async(req,res)=>{
    try {
        const orders=await Order.find({approved:false}).populate("userId",["name","email"])
        res.status(200).send({msg:"list of orders", orders})
    } catch (error) {
        res.status(500).send({msg:"could not get orders", error})
    }
})
router.put('/approveOrder/:id', isAuth, isAdmin, async(req,res)=>{
    const {id}=req.params
    try {
        await Order.findByIdAndUpdate(id, {$set:{...req.body, approved:true}})
        res.status(200).send({msg:"Order approved"})
    } catch (error) {
        res.status(500).send('could not approve order')
    }
})
module.exports=router