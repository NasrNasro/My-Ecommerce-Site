const express=require('express')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const Product = require('../models/Product')
const { productRules, validator } = require('../middlewares/validator')
const upload = require('../middlewares/upload')
const router=express.Router()

// get products
router.get('/', async(req,res)=>{
    try {
        const products=await Product.find()
        res.status(200).send({msg:"list of products", products})
    } catch (error) {
        res.status(500).send("could not get products")
    }
})

// add product
router.post('/addProduct', isAuth, isAdmin, upload.single("myImage"), productRules, validator, async(req,res)=>{
    try {
        if (!req.file){
            return res.status(400).send({ errors: [{ msg: "Product image is required" }] });
        }
        const newProduct=new Product({...req.body, imageUrl:req.file.filename, adminId:req.user.id})
        await newProduct.save()
        res.status(200).send({msg:'product added', newProduct})
    } catch (error) {
        res.status(500).send('could not add product')
    }
})

// get my products
router.get('/myproducts', isAuth, isAdmin, async(req,res)=>{
    try {
        const myProducts=await Product.find({adminId:req.user.id})
        res.status(200).send({msg:'my list of products', myProducts})
    } catch (error) {
        res.status(500).send({msg:'could not get my list of products', error})
    }
})

// get one product
router.get('/:id', async(req,res)=>{
    const {id}=req.params
    try {
        const foundProduct=await Product.findById(id)
        res.status(200).send({msg:'product found', foundProduct})
    } catch (error) {
        res.status(500).send('could not get product')
    }
})

// delete product
router.delete('/deleteProduct/:id', isAuth, isAdmin, async(req,res)=>{
    const {id}=req.params
    try {
        const deleted=await Product.findByIdAndDelete(id)
        res.status(200).send({msg:'product deleted', deleted})
    } catch (error) {
        res.status(500).send('could not delete product')
    }
})

// update product
router.put('/updateProduct/:id', isAuth, isAdmin, upload.single("myImage"), async(req,res)=>{
    const {id}=req.params
    try {
        if (!req.file){
            await Product.findByIdAndUpdate(id, {$set:{...req.body}})
        }else{
           await Product.findByIdAndUpdate(id, {$set:{...req.body, imageUrl:req.file.filename}})
        }
        res.status(200).send({msg:'product updated'})
    } catch (error) {
        res.status(500).send('could not update product')
    }
})

module.exports=router