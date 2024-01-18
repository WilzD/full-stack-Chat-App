const bcrypt=require('bcryptjs')
const User = require('../model/user')

exports.userSignup=async(req,res)=>{
    try {
        const {username,email,password}=req.body
        const useralreadyexist=await User.findOne({where:{email:email}})
        if(useralreadyexist){
          return res.status(404).json({msg:'user already exist'})
        }
        
        const saltround=10
        bcrypt.hash(password,saltround,async(err,hash)=>{
           await User.create({name:username,email:email,password:hash})
           return res.status(200).json({msg:'user signup successfull'})
        }) 
    } catch (error) {
        return res.status(400).json({msg:'something went wrong'})
    }

}