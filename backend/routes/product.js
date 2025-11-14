const express=require('express');
const { auth } = require('firebase-admin');
const router=express.Router()
const { create,listAll,remove,read,update,list,productsCount,productStar, listRelated  ,searchFilters  } = require('../controllers/product');  //controllers

const {authCheck,adminCheck}=require('../middleware/auth')  //middleware

router.post('/product',authCheck,adminCheck,create   //this auth check will be used to validate token from firebase admin and then only send to backend
);
router.get('/products/total',productsCount)
 router.get('/products/:count',listAll  //this auth check will be used to validate token from firebase admin and then only send to backend
 );   
 router.delete('/product/:slug',authCheck,adminCheck,remove);
 router.post('/search/filters',searchFilters) // for searching on navbar
 router.get('/product/:slug',read)
 router.put('/product/:slug',authCheck,adminCheck,update)
 router.post('/products',list)
 router.put("/product/star/:productId",authCheck,productStar)
 router.get('/product/related/:productId',listRelated)
 
// router.put('/category/:slug',authCheck,adminCheck,update) //this router will also check that is the user admin or not
// router.get('/category/:slug',read)
// router.delete('/category/:slug',authCheck,adminCheck,remove)
module.exports=router