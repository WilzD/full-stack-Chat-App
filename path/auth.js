const User=require('../model/user')
const jwt=require('jsonwebtoken')

exports.Authentication=async(req,res,next)=>{
    try {
        const token=req.header('Authorization')
        const user=jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
        const findUser=await User.findByPk(user.user)
        req.user=findUser
        next()
    } catch (error) {
        return res.status(403).json("Unauthorize user")
    }
}