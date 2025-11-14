const Category =require('../model/category')
const Sub=require('../model/sub')
const slugify =require('slugify')
const Product=require('../model/product')
exports.create=async (req,res)=>{
try{
    console.log('hey')
    const{name}=req.body
    console.log('hey')
    const category=await new Category({name,slug:slugify(name)}).save()
    res.json(category)
    console.log(category)}
    catch(err){
        res.status(400).send("create category failed")
    }
}
exports.read=async (req,res)=>{
    try{
    let category=await Category.findOne({slug:req.params.slug}).exec()
    const products=await Product.find({category})
    .populate('category')
   
    .exec()

    res.json({
        category,
        products:products
    })


}
    catch(err){
        console.log("No category present now")

    }
    
    //
}
exports.update=async (req,res)=>{

    const {name}=req.body
    console.log(name)
    let updated=await  Category.findOneAndUpdate({slug:req.params.slug},{name,slug:slugify(name)}).exec()
    res.json(updated)
    //
}
exports.remove=async (req,res)=>{
    try{
    let deleted=await Category.findOneAndDelete({slug:req.params.slug}).exec()
    res.json(deleted)}
    catch{
        console.log("delete failed")
    }
    //
}
exports.list=async (req,res)=>{
    console.log(" category present")
    let lists=await Category.find({}).exec()
    res.json(lists)
    //
}
exports.getCategorySubs=(req,res)=>{
    
    
        console.log('in')
        console.log(req)
        let subs=  Sub.find({parent:req.params._id}).exec((err,subs)=>{
            if(err){
                console.log(err)

            }
            console.log(subs)
            
             res.json(subs)
            
        })
        
        
        
    }

        
        
    
