const express=require('express')
const path=require('path')
const app=express()

const cors=require('cors')
app.use(cors())

require('dotenv').config()

const sequelizeDB = require('./path/database')

const bodyParser = require('body-parser')
app.use(bodyParser.json({ extended: false }))

const landingPage=require('./routes/landingPage')
app.use(landingPage)

const userPage=require('./routes/userPage')
app.use(userPage)

app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`${req.url}`)) //to construct a abosolute path to the Requested url
})

const User=require('./model/user')

const port=process.env.PORT
sequelizeDB.sync().then(() => {
    app.listen(port)
}).catch(err => {
    console.log(err)
    process.exit(1)  //if the sync in DB not happened then this code will exist with 1
})