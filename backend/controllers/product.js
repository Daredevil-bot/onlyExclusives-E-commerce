const Product=require('../model/product')
const slugify=require('slugify')
const User=require('../model/user')



exports.create=async (req,res)=>{
    try{
        console.log(req.body)
        req.body.slug=slugify(req.body.title)
        const newProduct=await new Product(req.body).save()
        console.log(newProduct)
        res.json(newProduct)
    }catch(err){
        console.log(err)
        res.status(400).send('create product failed')


    }
}
exports.listAll=async(req,res)=>{
    
    let products=await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt","desc"]])
    .exec();
    res.json(products)
}
exports.remove=async(req,res)=>{
    try{
        console.log("trying")
        const deleted=await Product.findOneAndRemove({
            slug:req.params.slug,
        }).exec();
        res.json(deleted);
    }
    catch(err){
        res.json(err);
        console.log(err);

    }
}
exports.read=async(req,res)=>{
    const product=await Product.findOne({slug:req.params.slug})
    .populate('category')
    .populate('subs')
    .exec()
    res.json(product);
};
exports.update=async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
        const updated=await Product.findOneAndUpdate(
            {slug:req.params.slug},req.body,{new:true})
            .exec();
            res.json(updated);

    }
    catch(err){
        console.log(err);
    }
}
// exports.list=async(req,res)=>{
//     try{
//         console.log('in1')
//         const{sort,order,limit}=req.body
//         const products=await Product.find({})
//         .populate('category')
//         .populate('subs')
//         .sort([[sort,order]])
//         .limit(limit)
//         .exec()
//         console.log(products)
//         res.json(products)
//     }
//     catch(err){
//         console.log(err)
//     }
// }
exports.productsCount=async(req,res)=>{
    let total=await Product.find({}).estimatedDocumentCount().exec();
    console.log(total)
    res.json(total)
}
exports.list=async(req,res)=>{
    console.log(req.body)
    try{
        
        const{sort,order,page}=req.body
        console.log(page)
        const currentPage=page||1;
        const perPage=3;
        const products=await Product.find({})
        .skip((currentPage-1)*perPage)
        .populate('category')
        .populate('subs')
        .sort([[sort,order]])
        .limit(perPage)
        .exec()
        console.log(products)
        res.json(products)
    }
    catch(err){
        console.log(err)
    }
}
exports.productStar=async(req,res)=>{
    const product=await Product.findById(req.params.productId).exec()
    const user=await User.findOne({email:req.user.email}).exec()

    const {star}=req.body
    let existingRatingObject=product.ratings.find((ele)=>(ele.postedBy.toString()===user._id.toString()))


    if(existingRatingObject==undefined){
        let ratingAdded=await Product.findByIdAndUpdate(product._id,{
            $push:{ratings:{star:star,postedBy:user._id}},
        },
        {new:true}
        ).exec()
        console.log("rating added",ratingAdded)
        res.json(ratingAdded)
    }
    else{
        const ratingUpdated=await Product.updateOne({
            ratings:{$elemMatch: existingRatingObject},
        },
        {$set:{"ratings.$.star":star}},
        {new:true}
        ).exec();
        console.log("ratingUpdated",ratingUpdated)
        res.json(ratingUpdated)
    }
}
exports.listRelated=async(req,res)=>{
    
    const product=await Product.findById(req.params.productId).exec()
    console.log(product)

    const related=await Product.find({
        _id:{$ne:product._id},
        category: product.category
    })
    
    .limit(3)
    .populate('category')
    .populate('subs')
    
    .exec()
    console.log(related)
    res.json(related)
}
const handleQuery = async (req, res, query) => {
    const products = await Product.find(
      {
        $or: [{ $text: { $search: query } }, { description: { $regex: query, $options: 'i' } }]
      }
    )
      .populate('category', '_id name')
      .populate('subs', '_id name')

      .exec();
   
    res.json(products);
  }

const handlePrice=async(req,res,price)=>{
    try{
        let products=await Product.find({
            price:{
                $gte:price[0],
                $lte:price[1],
            }
        })
        .populate('category', '_id name')
      .populate('subs', '_id name')

      .exec();
      res.json(products)
    }
    catch(err){
        console.log(err)
    }
}
const handleCategory=async(req,res,category)=>{
    try{
    let products=await Product.find({
        category
    })
    .populate('category', '_id name')
    .populate('subs', '_id name')

    .exec();
    res.json(products)
  }
  catch(err){
      console.log(err)
  }

}
const handleSubs=async(req,res,sub)=>{
    try{
        let products=await Product.find({
            subs:sub
        })
        .populate('category', '_id name')
        .populate('subs', '_id name')
    
        .exec();
        res.json(products)
      }
      catch(err){
          console.log(err)
      }
    
}
const handleShipping=async(req,res,shipping)=>{
    try{
        let products=await Product.find({
            shipping
        })
        .populate('category', '_id name')
        .populate('subs', '_id name')
    
        .exec();
        res.json(products)
      }
      catch(err){
          console.log(err)
      }
}
const handleBrand=async(req,res,brand)=>{
    try{
        let products=await Product.find({
            brand
        })
        .populate('category', '_id name')
        .populate('subs', '_id name')
    
        .exec();
        res.json(products)
      }
      catch(err){
          console.log(err)
      }
}
const handleColor=async(req,res,color)=>{
    try{
        let products=await Product.find({
            color
        })
        .populate('category', '_id name')
        .populate('subs', '_id name')
    
        .exec();
        res.json(products)
      }
      catch(err){
          console.log(err)
      }
}

exports.searchFilters = async (req, res) => {
    const { query,price,category,sub,shipping,color,brand } = req.body;
   
    if (query) {
      console.log("query", query);
      await handleQuery(req, res, query);
    }
    if(price!=undefined){
        console.log('price------>',price)
        await handlePrice(req,res,price)
    }
    if(category){
        console.log('category----->',category)
        await handleCategory(req,res,category)
    }
    if(sub){
        console.log('subs---->',sub)
        await handleSubs(req,res,sub)
    }
    if(shipping){
        console.log('shipping---->',shipping)
        await handleShipping(req,res,shipping)
    }
    if(color){
        console.log('color---->',color)
        await handleColor(req,res,color)
    }
    if(brand){
        console.log('brand---->',brand)
        await handleBrand(req,res,brand)
    }
  };