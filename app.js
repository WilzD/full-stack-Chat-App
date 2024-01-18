const express=require('express')
const path=require('path')
const app=express()

const landingPage=require('./routes/landingPage')
app.use(landingPage)

app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`${req.url}`)) //to construct a abosolute path to the Requested url
})

app.listen(3000)