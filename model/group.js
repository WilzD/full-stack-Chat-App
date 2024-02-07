const Sequelize=require('sequelize')
const sequelize=require('../path/database')
const Group=sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    groupname:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    createdby:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})
module.exports=Group