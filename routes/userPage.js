const express=require('express')
const router=express.Router()

const userController=require('../controller/userController')


router.post('/userSignup',userController.userSignup)

module.exports=router