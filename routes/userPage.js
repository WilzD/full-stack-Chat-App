const express=require('express')
const router=express.Router()

const userController=require('../controller/userController')


router.post('/userSignup',userController.userSignup)
router.post('/userLogin',userController.userLogin)

module.exports=router