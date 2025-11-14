const express=require('express');
const { createUpdate,currentUser } = require('../controllers/auth');  //controllers
const router=express.Router()
const {authCheck,adminCheck}=require('../middleware/auth')  //middleware

router.post('/create-and-update-user',authCheck,createUpdate   //this auth check will be used to validate token from firebase admin and then only send to backend
);
router.post('/current-user',authCheck,currentUser   //this auth check will be used to validate token from firebase admin and then only send to backend
);          
router.post('/current-admin',authCheck,adminCheck,currentUser) //this router will also check that is the user admin or not
module.exports=router