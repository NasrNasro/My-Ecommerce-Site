const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    details:String,
    imageUrl:String,
    adminId:{type:mongoose.Schema.Types.ObjectId}
});
module.exports=mongoose.model('Product',productSchema);