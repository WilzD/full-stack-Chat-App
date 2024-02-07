const express=require('express')
const router=express.Router()

const messageController=require('../controller/messageController')
const Authentication=require('../path/auth')


router.post('/store-message',Authentication.Authentication,messageController.storeMessage)
router.get('/show-message/:GroupId',Authentication.Authentication,messageController.showMessage)
router.get('/new-message',Authentication.Authentication,messageController.newMessage)



module.exports=router