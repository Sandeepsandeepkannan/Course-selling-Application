require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")
const z=require("zod")
const bcrypt=require("bcrypt")
const jwt_secret="sasbfjakjbfkbrkjnkncksn1213"


const {usermodel}=require("./db")

const {userrouter}=require("./routes/user")
const {adminrouter}=require("./routes/admin")
const {courserouter}=require("./routes/course")



const app=express();
app.use(express.json())
app.use("/user",userrouter)
app.use("/admin",adminrouter)
app.use("/course",courserouter)


async function main(){
    const MONGO_URL = process.env.MONGO_URL;
    await mongoose.connect(MONGO_URL)
    app.listen(3000)}
    console.log("server is running on port 3000")

   main() 