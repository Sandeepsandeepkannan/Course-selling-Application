const {Router}=require("express")
const { purchasesmodel } = require("../db")
const {usermiddleware}=require("../middleware/user")
const mongoose = require("mongoose");

const  courserouter=Router()


courserouter.post("/purchase", usermiddleware,async function(req,res){
    const userid=req.userid
         await purchasesmodel.create({
             id:Objectid,
             courseid:Objectid,
             userid:userid
         })
        res.json({ message: "Course purchased successfully" });

})


courserouter.get("/courses",function(req,res){
    
})
module.exports={
    courserouter:courserouter
}