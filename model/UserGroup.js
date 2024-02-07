const Sequelize=require('sequelize')
const sequelize=require('../path/database')
const UserGroup=sequelize.define('usergroup',{
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
    username:{
        type:Sequelize.STRING,
    },
    isadmin:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false,
    }
})
module.exports=UserGroup