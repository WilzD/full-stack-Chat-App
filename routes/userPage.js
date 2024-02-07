const express=require('express')
const router=express.Router()

const userController=require('../controller/userController')
const Authentication=require('../path/auth')


router.post('/userSignup',userController.userSignup)
router.post('/userLogin',userController.userLogin)

router.get('/all-users/:GroupId',Authentication.Authentication,userController.allUsers)



// router.get('/allUsers',Authentication.Authentication,userController.allUsers)


module.exports=router