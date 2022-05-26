const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    panier:{type:Array,default: undefined,required:true},
    approved:{type:Boolean,default:false},
    userId:[{type:mongoose.Schema.Types.ObjectId ,  ref:'User'}]
},
{
    timestamps:true
});
module.exports=mongoose.model('Order',orderSchema)