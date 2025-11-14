//this middleware work is to check or validate token when send from frontend to backend it checks in between and if true will save the user in the database
const User = require("../model/user");
const { adminAuth } = require("../firebaseAdmin");
exports.authCheck=async (req,res,next)=>{
    
    // here we will check for validation of token because as middle ware token will come to the req argument of this function
    //data send to middleware will be accesed through req from here 
    try{
        console.log('in authcheck')
        const fbuser=await adminAuth.verifyIdToken(req.headers.authtoken)

        req.user=fbuser
        next()                                         //this will send user after validation from firebase
    }
    catch(error){
        res.status(401).json({
            err: `invalid or expired token`
        })

    }
    
    

}
exports.adminCheck=async (req,res,next)=>{
    const {email}=req.user                          //this will check for admin and as req.user it will get the user from the first middleware
    const adminUser=await User.findOne({email}).exec() //this will store email of user
    if(adminUser.role !="admin"){
        res.status(403).json({
            err:"Admin resource access denied"
        })
        
    } 
    else{
        
        next()
    }
}

