const express=require('express')
const router=express.Router()

const groupController=require('../controller/groupController')
const Authentication=require('../path/auth')


router.post('/create-group',Authentication.Authentication,groupController.createGroup)
router.get('/allGroupsData',Authentication.Authentication,groupController.allGroupsData)
router.get('/new-group',Authentication.Authentication,groupController.newGroup)
router.get('/groupInfo/:GroupId',Authentication.Authentication,groupController.groupInfo)
router.post('/add-new-user-to-group',Authentication.Authentication,groupController.addNewUserTogroup)
router.post('/join-group',Authentication.Authentication,groupController.joinGroup)
router.delete('/delete-member/:id',Authentication.Authentication,groupController.deleteMemberFromgroup)


module.exports=router