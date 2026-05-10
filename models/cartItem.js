const { DataTypes }= require("sequelize");

const sequelize = require("../db");

const CartItem = sequelize.define("CartItem",{

    firebaseUid:{
        type:DataTypes.STRING,
        allowNull:false
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

    Quantity:{
        type:DataTypes.INTEGER,
        defaultValue:1
    }

});

module.exports=CartItem;