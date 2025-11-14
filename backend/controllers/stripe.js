const User=require('../model/user')
const Cart=require('../model/cart')
const Product=require('../model/product')

const stripe=require('stripe')(process.env.STRIPE_SECRET)

exports.createPaymentIntent=async(req,res)=>{

    const user =await User.findOne({email: req.user.email}).exec()

    const {cartTotal}=await Cart.findOne({orderdBy:user._id}).exec()
    console.log('total cart',cartTotal)
    const paymentIntent=await stripe.paymentIntents.create({
        amount:cartTotal*100,
        currency:"inr",
    })
   let finalAmount=cartTotal
    res.send({
        
        clientSecret : paymentIntent.client_secret,
        cartTotal,
        
    })
   
}