
const Sequelize=require('sequelize')
const sequelize=require('../path/database')
const Message=sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    sendername:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    message:{
        type:Sequelize.STRING,
        allowNull:false,
    },
})
module.exports=Message


