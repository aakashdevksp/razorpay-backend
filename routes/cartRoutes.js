const express=require("express");

const router=express.Router();

const CartItem=require("../models/cartItem");

//ADD Cart
router.post("/add",async (req,res)=>{

    try {
        const{
            firebaseUid,
            foodId,
            foodName,
            image,
            price

        }=req.body;

        const existingItem=await CartItem.findOne({
            where:{
                firebaseUid,
                foodId
            }
        });

        if(existingItem){
            existingItem.quantity +=1;

            await existingItem.save();

        }else{

            await CartItem.create({
                    firebaseUid,
                    foodId,
                    foodName,
                    image,
                    price
            });
        }

        res.json({
            success:true,
            message:"Added to cart"
        });
    } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            });
    }
});

//GET CART ITEMS 

router.get("/:firebaseUid",async (req,res)=>{

    try {
        
        const {firebaseUid}=req.params;

        const cartItems= await CartItem.findAll({
            where:{ firebaseUid}
        });

        res.json({
            success:true,
            cartItems
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
});

//CLEAR CART 

router.delete("/clear/:firebaseUid",async (req,res)=>{
        try {

            const { firebaseUid }=req.params;

            await CartItem.destroy({
                where:{firebaseUid}
            });

            res.json({
                success:true,
                message:"Cart cleard"
            });

            
        } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            });                
        }
});

module.exports=router;