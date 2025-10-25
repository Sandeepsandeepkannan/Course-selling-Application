const mongoose=require("mongoose")
const {Schema}=mongoose

const userschema=new Schema({
    username:String,
    hashedpassword:String,
    email:String
})

const adminschema=new Schema({
    username:String,
    password:String,
    email:String
})

const courseschema=new Schema({
    title:String,
    description:String,
    price:  Number,
    imageurl:String,
    creatorid: { type: Schema.Types.ObjectId, ref: "Admin" }
})

const purchaseschema=new Schema({
    courseid: { type: Schema.Types.ObjectId, ref: "Courses" },
    userid: { type: Schema.Types.ObjectId, ref: "users" }
})


const usermodel=mongoose.model("users",userschema)
const adminmodel=mongoose.model("Admin",adminschema)
const coursemodel=mongoose.model("Courses",courseschema)
const purchasesmodel=mongoose.model("purchases",purchaseschema)

module.exports={
    usermodel:usermodel,
    adminmodel:adminmodel,
    coursemodel:coursemodel,
    purchasesmodel:purchasesmodel
}