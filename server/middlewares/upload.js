const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:'../client/public/uploads',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        const fileType=/jpeg|jpg|png/ig
        const extName=fileType.test(path.extname(file.originalname))
        if(extName){
            cb(null,true)
        }else{
            cb('Error:images only')
        }
    }
})
module.exports=upload