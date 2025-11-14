const User =require('../model/user')
exports.createUpdate=async (req,res)=>{

    //now after validation of token from middleware it will pass req to backend to create or update user in database and also store in the backend
    const{name,picture,email}=req.user
    const user=await User.findOneAndUpdate({email},{name,picture},{new:true}) //this method takes two argument first argument for how to find and second what to update
    if(user){
        console.log(user)
        res.json(user)    
        console.log(user)       // if user already present in data base 
    }else {
        const newUser=await new User({
            name,
            picture,
            email
        }).save()
        
        res.json(newUser)                            
    }                                                                
}
exports.currentUser=async (req,res)=>{

    //now after validation of token from middleware it will pass req to backend for current  user in database and also store in the backend
    
     User.findOne({email : req.user.email}).exec((err,user)=>{
        if(err) throw new Error(err)
        res.json(user)
        console.log(user)
    }) 
                           //this will give the current user 
                                                             
}