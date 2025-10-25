const {Router}=require("express")
const  userrouter=Router()
const {usermiddleware}=require("../middleware/user")
const {JWT_USER_PASSWORD}=require("../config")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {usermodel}=require("../db")

userrouter.post("/signup", async function(req,res){
  const username=req.body.username
  const email=req.body.email
  const password=req.body.password
  
  const userlist= await usermodel.findOne({
    email:email
  })
  if(userlist){
    res.json({message:"please signup with new mailid , this mail is already used "})
              }
   else{
   
    const hashedpassword= await bcrypt.hash(password,5)

    await usermodel.create({
        username:username,
        email:email,
        hashedpassword:hashedpassword
    })
   }
})

userrouter.post("/signin", async function(req,res){
     const username=req.body.username
     const email=req.body.email
     const password=req.body.password

     const matchfound= await usermodel.findOne({email: email})
     if(matchfound){
        const passwordmatch= await bcrypt.compare(password,matchfound.hashedpassword)
     }

     if(passwordmatch){
        const token= await jwt.sign({username},JWT_USER_PASSWORD)
        res.json({token:token})
     }
     
     else{
        res.json({message:" you have to Signup first "})
     }
})

userrouter.get("user/courses",function(req,res){


})


module.exports={
    userrouter:userrouter
}

