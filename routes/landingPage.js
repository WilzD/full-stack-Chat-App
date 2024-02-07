const express=require('express')
const router=express.Router()
const Authentication=require('../path/auth')

const controller=require('../controller/landingPage')

//serving only html pages here no authentication required
router.get('/',controller.landingPage)
router.get('/login',controller.loginPage)
router.get('/forgotPassword',controller.forgotPassword)
router.get('/firstmsg',controller.firstMsg)
router.get('/secondmsg',controller.secondMsg)
router.get('/thirdmsg',controller.thirdMsg)

router.get('/allGroups',controller.allGroupPage)
router.get('/chat',controller.ChatPage)
router.get('/groupInfo',controller.groupInfoPage)



module.exports=router