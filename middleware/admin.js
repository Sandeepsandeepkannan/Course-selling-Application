const jwt=require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD}=require("../config");
const { ParseStatus } = require("zod/v3");


function adminmiddleware(req,res,next){
     const token=req.headers.authorization;
     const tokenmatch =jwt.verify(token,JWT_ADMIN_PASSWORD)
     if(tokenmatch){
        next()
     }
}

module.exports={adminmiddleware}