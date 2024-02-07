const express=require('express')
const path=require('path')
const app=express()

const cors=require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:false}));

require('dotenv').config()   

const sequelizeDB = require('./path/database')

const bodyParser = require('body-parser')
app.use(bodyParser.json({ extended: false }))

const landingPage=require('./routes/landingPage')
app.use(landingPage)

const userPage=require('./routes/userPage')
app.use(userPage)

const groupPage=require('./routes/groupPage')
app.use(groupPage)

const messagePage=require('./routes/messagePage')
app.use(messagePage)

app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`${req.url}`)) //to construct a abosolute path to the Requested url
})

const User=require('./model/user')
const Message=require('./model/message')
const Group=require('./model/group')
const UserGroup=require('./model/UserGroup')

//one user can have many message
User.hasMany(Message)
Message.belongsTo(User,{constraints:true,onDelete:'CASCADE'})

//many user can have many groups
Group.belongsToMany(User,{through:UserGroup})
User.belongsToMany(Group,{through:UserGroup})

//one group can have many message
Group.hasMany(Message)
Message.belongsTo(Group,{constraints:true,onDelete:'CASCADE'})



const port=process.env.PORT
sequelizeDB.sync().then(() => {
    app.listen(port)
}).catch(err => {
    console.log(err)
    process.exit(1)  //if the sync in DB not happened then this code will exist with 1
})

// {force:true} for recreating shemas