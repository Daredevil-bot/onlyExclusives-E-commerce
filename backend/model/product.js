const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        maxlength:32,
        required:true,
        text:true
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,
        index:true
    },
    description:{
        type:String,
        maxlength:200,
        required:true,
        text:true
    },
    price:{
        type:Number,
        maxlength:32,
        trim:true,
        required:true,
    
    },
    category:{
          type:ObjectId,
          ref:'Category'
    
     },
    subs:[{
        type:ObjectId,
        ref:'Sub'
    
    },
],
    quantity:Number,
    sold:{
        type:Number,
        default:0
    },
     images:{
         type:Array
     },
    shipping:{
        type:String,
        enum:['Yes','No']
    },
    color:{
        type:String,
        enum:['Black','Brown','Silver','White','Blue','Red']
    },
    brand:{
        type:String,
        brand:['Apple','Lenovo','ASUS','Dell','HP','Microsoft','Samsung']
    },
     ratings:[
         {
             star:Number,
             postedBy:{
                 type:ObjectId,
                 ref:'User'
             }
         }
     ]

},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)
