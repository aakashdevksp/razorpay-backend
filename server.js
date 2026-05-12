require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const sequelize=require("./db");


const authRoutes=require("./routes/authRoutes");
const cartRoutes=require("./routes/cartRoutes");
const orderRoutes=require("./routes/orderRoutes");




const app = express();
app.use(express.json());
app.use(cors());



//ROUTES
app.use("/auth",authRoutes);
app.use("/cart",cartRoutes);
app.use("/orders",orderRoutes);



// 🔐 Replace with your Razorpay keys
const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret
});

// ✅ Create Order API
app.post("/create-order", async (req, res) => {
  try {
   const { amount } = req.body || {};

if (!amount) {
  return res.status(400).json({
    success: false,
    message: "Amount is required"
  });
}

    const options = {
      amount: amount, // paisa (₹500 = 50000)
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
});

// Server start
const PORT = process.env.PORT || 5000;

sequelize.sync()
.then(()=>{
    console.log("database synced");

    app.listen(PORT,()=>{
       console.log(`Server running on port ${PORT}`);
    })

  })
  .catch( (error)=>{
    console.log(error);
  });






  




