const {DataTypes}=require("sequelize");

const sequelize=require("../db");

const Order=sequelize.define("Orders",{

    firebaseUid:{
        type:DataTypes.STRING,
        allowNull:false
    },

    rozarpayOrderId:{
        type:DataTypes.STRING
    },
    rozarpayPaymentId:{
        type:DataTypes.STRING
    },
    totalAmount:{
        type:DataTypes.INTEGER
    },
    paymentStatus:{
        type:DataTypes.STRING,
        defaultValue:"PAID"
    },
    orderStatus:{
        type:DataTypes.STRING,
        defaultValue:"PLACED"
    }

});

module.exports=Order;