//this is the method of making schema for user which will be used to store data in the database
const mongoose=require('mongoose')
const{ObjectId}=mongoose.Schema

const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        index:true
    },
    role:{
        type: String,
        default:'subscriber'
    },
    cart:{
        type:Array,
        default:[]
    },
    address:String,
    // wishlist:{
    //     type:{ObjectId},
    //     ref:"Product"
    // }

    
},{timestamps:true})

module.exports=mongoose.model('User',userSchema)  //first argument  name of model 2nd argument for which schema name is given 

//this whole file defines the schema for user only