const {DataTypes}=require("sequelize")
const sequelize=require("../db")

const User=sequelize.define("User",{

    firebaseUid:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    phone:{
        type:DataTypes.STRING
    }
});

module.exports=User;