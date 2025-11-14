const express=require('express');
const { create,read,update,remove,list,getCategorySubs } = require('../controllers/category');  //controllers
const router=express.Router()
const {authCheck,adminCheck}=require('../middleware/auth')  //middleware

router.post('/category',authCheck,adminCheck,create   //this auth check will be used to validate token from firebase admin and then only send to backend
);
router.get('/categories',list   //this auth check will be used to validate token from firebase admin and then only send to backend
);          
router.put('/category/:slug',authCheck,adminCheck,update) //this router will also check that is the user admin or not
router.get('/category/:slug',read)
router.delete('/category/:slug',authCheck,adminCheck,remove)
router.get('/category/subs/:_id',getCategorySubs)
module.exports=router