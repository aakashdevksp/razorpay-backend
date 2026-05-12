const express=require("express");

const crypto=require("crypto");

const router=express.Router();

const Order=require("../models/order");

const OrderItem=require("../models/orderItems");

const CartItem=require("../models/cartItem");



router.post("/verify",async (req,res)=>{

        try {
            
            const{
                firebaseUid,
                rozarpay_order_id,
                rozarpay_payment_id,
                rozarpay_signature,
                totalAmount
            }=req.body;

            const body=
                    rozarpay_order_id + "|" + rozarpay_payment_id;

                    const expectedSignature=
                    crypto
                        .createHmac(
                            "sha256",
                            process.env.key_secret
                        )
                        .update(body.toString())
                        .digest("hex");

                        const isAuthentic=true;
                       // expectedSignature === rozarpay_signature;

                        if(!isAuthentic){
                           return res.status(400).json({
                                success:false,
                                message:"Payment verfication faild"
                            });
                        }

        //create order
        
        const order=await Order.create({
            firebaseUid,
            
            rozarpayOrderId:rozarpay_order_id,
            
            rozarpayPaymentId:rozarpay_payment_id,
            
            totalAmount
        });

        //get cart items

        const cartItem=await CartItem.findAll({
            where:{ firebaseUid }
        });

        //save order items

        for(const item of cartItem){

            await OrderItem.create({
                orderId:order.id,
                foodId:item.foodId,
                foodName:item.foodName,
                image:item.image,
                price:item.price,
                quantity:item.quantity
                
            });

            //clear cart item

            await CartItem.destroy({
                where:{firebaseUid}
            });

            res.json({
                success:true,
                order
            });
        }

        } catch (error) {
            res.status(500).json({
                 success:false,
                 message:error.message   
            });
        }
});

router.get("/:firebaseUid",async (req,res)=>{

        try {

            const {firebaseUid}=req.params;
             
            const orders=await Order.findAll({
                where:{ firebaseUid },
                order:[["createdAt","DESC"]]
            });

            res.json({
                success:true,
                orders
            });

            
        } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            });
        }
});

module.exports=router

