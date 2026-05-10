const express=require("express");

const router=express.Router()

const User=require("../models/Users");






router.post("/login",async(req,res)=>{
   console.log("LOGIN API HIT");
    try {

      const {firebaseUid,phone}=req.body;

      let user=await User.findOne({
        Where:{ firebaseUid }
      });

      if(!user){
        user=await User.create({
          firebaseUid,
          phone
        });

      }

      res.json({
          success:true,
          user
        });
      
    } catch (error) {
        res.status(500).json({
          success:false,
          message:error.message
        });
    }

  })

  module.exports=router;