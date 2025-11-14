const express=require('express');

const router =express.Router()


const {authCheck,adminCheck}=require('../middleware/auth')  //middleware
const { userCart,getUserCart,emptyCart, saveAddress,createOrder,orders } = require('../controllers/user');



router.post('/user/cart',authCheck,userCart)
router.get('/user/cart',authCheck,getUserCart)
router.delete('/user/cart',authCheck,emptyCart)
router.post('/user/address',authCheck,saveAddress)
router.post('/user/order',authCheck,createOrder)
router.get('/user/address',authCheck,orders);

module.exports=router