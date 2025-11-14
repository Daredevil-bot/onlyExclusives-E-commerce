const express=require('express');
const { create,read,update,remove,list } = require('../controllers/sub');  //controllers
const router=express.Router()
const {authCheck,adminCheck}=require('../middleware/auth')  //middleware

router.post('/sub',authCheck,adminCheck,create   //this auth check will be used to validate token from firebase admin and then only send to backend
);
router.get('/subs',list   //this auth check will be used to validate token from firebase admin and then only send to backend
);          
router.put('/sub/:slug',authCheck,adminCheck,update) //this router will also check that is the user admin or not
router.get('/sub/:slug',read)
router.delete('/sub/:slug',authCheck,adminCheck,remove)
module.exports=router