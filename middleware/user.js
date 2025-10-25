const jwt=require("jsonwebtoken")
const { JWT_USER_PASSWORD } = require("../config");
const { usermodel } = require("../db");

function usermiddleware(req,res,next){
    const {email,password}=req.body
    const adminmatch=jwt.verify(password,JWT_USER_PASSWORD)

    if(adminmatch){
        const userid=adminmatch.id
        next()
    }
    else{
        res.json({message:"wrong user credentials"})
    }


}
module.exports={usermiddleware}