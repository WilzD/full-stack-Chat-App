const Message=require('../model/message')
const UserGroup=require('../model/UserGroup')
const sequelize = require('../path/database')
const Group=require('../model/group')

exports.storeMessage=async(req,res)=>{
    try {
        const {msg,groupId}=req.body
        console.log(msg,groupId)
        const findingGroup=await Group.findOne({where:{id:groupId}})
        const data=await Message.create({sendername:req.user.name,message:msg,userId:req.user.id,groupId:groupId})
        return res.status(200).json({msg:"msg saved succesfully",data:data})

    } catch (error) {
        console.log(error)
        return res.status(401).json({msg:'unsable to send message'})
    }
}

exports.showMessage=async(req,res)=>{  
const {GroupId}=req.params
const findingUserGroup=await UserGroup.findOne({where:{groupId:GroupId,userId:req.user.id}})
if(!findingUserGroup){
return res.status(403).json({msg:'You are not a member of this group'})
}else{
    const allMsg=await Message.findAll({where:{groupId:GroupId}})
    return res.status(200).json({allMsg:allMsg})
}

}

exports.newMessage=async(req,res)=>{
    // const newMsg= await message.findAll({
    //     limit: 1,
    //     order: [ [ 'createdAt', 'DESC' ]]
    //   }) 
    // return res.status(200).json({msgdata:newMsg})
}