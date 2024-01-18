const express=require('express')
const router=express.Router()

const controller=require('../controller/landingPage')


router.get('/',controller.landingPage)
router.get('/login',controller.loginPage)
router.get('/forgotPassword',controller.forgotPassword)
router.get('/firstmsg',controller.firstMsg)
router.get('/secondmsg',controller.secondMsg)
router.get('/thirdmsg',controller.thirdMsg)
router.get('/chat',controller.ChatPage)


module.exports=router