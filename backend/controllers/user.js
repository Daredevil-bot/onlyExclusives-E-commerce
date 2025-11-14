const User=require('../model/user')
const Product=require('../model/product')
const Cart=require('../model/cart')
const Order = require('../model/order')

exports.userCart=async(req,res)=>{
    const {cart}=req.body
    let products=[]

    const user=await User.findOne({email:req.user.email}).exec()

    let cartExistByThisUser=await Cart.findOne({orderdBy:user._id}).exec()

    if(cartExistByThisUser){
        cartExistByThisUser.remove()
        console.log('removed old cart')

    }
    for(let i=0;i<cart.length;i++){
        let object={}
        object.product=cart[i]._id
        object.count=cart[i].count
        object.color=cart[i].color

        let{price}=await Product.findById(cart[i]._id).select('price').exec()
        object.price=price

        products.push(object)
    }

    let cartTotal=0;
    for(let i=0;i<products.length;i++){
        cartTotal=cartTotal+products[i].price * products[i].count
    }

    let newCart= await new  Cart({
        products,
        cartTotal,
        orderdBy:user._id
    }).save()
    console.log('newCart',newCart)
    res.json({ok:true})

}

exports.getUserCart=async(req,res)=>{
    const user=await User.findOne({email:req.user.email}).exec()

    let cart=await  Cart.findOne({orderdBy:user._id})
    .populate('products.product','_id title price totalAfterDiscount')
    .exec()

    const{products,cartTotal,totalAfterDiscount}=cart
    res.json({products,cartTotal,totalAfterDiscount})
}
exports.emptyCart=async(req,res)=>{
    const user =await User.findOne({email:req.user.email}).exec()

    const cart=await Cart.findOneAndRemove({orderdBy:user._id}).exec()

    res.json(cart)
}
exports.saveAddress=async(req,res)=>{
    const userAddress=await User.findOneAndUpdate({email:req.user.email},{address:req.body.address}).exec()

    res.json({ok:true})
}
exports.createOrder=async(req,res)=>{
    const {paymentIntent}=req.body.stripeResponse;
    const user=await User.findOne({email:req.user.email}).exec()
    let{products}=await Cart.findOne({orderdBy:user._id}).exec();

    let newOrder=await new Order({
        products,
        paymentIntent,
        orderdBy:user._id,
    }).save()

    let bulkOption=products.map((item)=>{
        return {
            updateOne:{
                filter:{_id:item.product._id},
                update:{$inc:{quantity:-item.count,sold: +item.count}},
            }
        }
    })
 let updated=await Product.bulkWrite(bulkOption,{});
    console.log(newOrder)

    res.json({ok:true});
}

exports.orders=async(req,res)=>{
    let user =await User.findOne({email:req.user.email}).exec()

    let userOrders=await Order.find({
        orderdBy:user._id
    })
    .populate('products.product')
    .exec();
    console.log(userOrders);
    console.log('13434');
    res.json(userOrders);
}

