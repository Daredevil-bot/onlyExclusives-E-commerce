
//this will fine define the schema for category of products w r t to categories 
//and shows how the categories will be stored in database

const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const categoryScehma = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required:"Name is required",
        minlength:[3,"Too short"],
        maxlength:[32,"Too long"]
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    },

},{timestamps:true}
);
module.exports=mongoose.model('Category',categoryScehma)