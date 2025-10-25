const {Router}=require("express")
const { adminmodel } = require("../db")
const { coursemodel } = require("../db")
const  adminrouter=Router()
const jwt=require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD}=require("../config")
const bcrypt=require("bcrypt")
const {adminmiddleware}=require("../middleware/admin")


adminrouter.post("/signup", async function(req,res){
  const username=req.body.username
  const email=req.body.email
  const password=req.body.password
  console.log("request came")


  const userlist= await adminmodel.findOne({
    email:email
  })
  if(userlist){
    res.json({message:"please signup with new mailid , this mail is already used "})
              }
   else{
   
    const hashedpassword= await bcrypt.hash(password,5)

    await adminmodel.create({
        username:username,
        email:email,
        password:hashedpassword
        })
        res.json({ message: "Admin created successfully" });
   }
})


adminrouter.post("/signin",async function(req,res){
    const email=req.body.email
    const password=req.body.password

    const adminmatch= await adminmodel.findOne({email});

    if(!adminmatch){
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const adminpasswordmatch= await bcrypt.compare(password,adminmatch.password)
    if (adminpasswordmatch){
        const token = await jwt.sign({email: adminmatch.email, id: adminmatch._id },JWT_ADMIN_PASSWORD)
        res.json({token:token})

    }
    else{
      res.json({ message: "Wrong password" });
    }

    
})

adminrouter.post("/createcourse",adminmiddleware, async function(req,res){
      const {title,description,price,imageurl}=req.body
      
      const coursecreation= await coursemodel.create({
        title,
        description,
        price,
        imageurl

      })
      res.json({ message: "Course created successfully" });
})

adminrouter.get("/allcourses",adminmiddleware, async function(req,res){
  const courses= await coursemodel.find()
  res.json({courses})

})

module.exports={
    adminrouter:adminrouter
}