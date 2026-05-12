const { DataTypes }=require("sequelize");

const sequelize = require("../db");

const OrderItem = sequelize.define("OrderItem",{

    orderId:{
        type:DataTypes.INTEGER
    },
    foodId:{
        type:DataTypes.INTEGER
    },
    foodName:{
        type:DataTypes.STRING
    },
    image:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.INTEGER
    },
    quantity:{
        type:DataTypes.INTEGER
    }
});

module.exports=OrderItem;