const Sub =require('../model/sub')
const slugify =require('slugify')
const Product=require('../model/product')
exports.create=async (req,res)=>{
try{
    console.log('hey')
    const{name,parent}=req.body
    console.log('hey')
    const sub=await new Sub({name,parent,slug:slugify(name)}).save()
    res.json(sub)
    console.log(sub)}
    catch(err){
        console.log('hey')
        res.status(400).send("create Sub failed")
    }
}
exports.read=async (req,res)=>{
    try{
        console.log('hi')
    let sub=await Sub.findOne({slug:req.params.slug}).exec()
    
    const products=await Product.find({subs:sub})
    .populate('category')
   
    .exec()

    res.json({
        sub,
        products
    })
}

    catch(err){
        console.log("No Sub present now")

    }
    
    //
}
exports.update=async (req,res)=>{

    const {name,parent}=req.body
    console.log(name)
    let updated=await  Sub.findOneAndUpdate({slug:req.params.slug},{name,parent,slug:slugify(name)}).exec()
    res.json(updated)
    //
}
exports.remove=async (req,res)=>{
    try{
    let deleted=await Sub.findOneAndDelete({slug:req.params.slug}).exec()
    res.json(deleted)}
    catch{
        console.log("delete failed")
    }
    //
}
exports.list=async (req,res)=>{
    console.log("no Sub present")
    let lists=await Sub.find({}).exec()
    res.json(lists)
    //
}