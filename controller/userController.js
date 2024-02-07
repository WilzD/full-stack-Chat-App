const bcrypt = require('bcryptjs')
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const UserGroup = require('../model/UserGroup');

const Op = require('sequelize').Op; //including op(operators) using it to ommit my name from users list

function generateJWTtoken(id) {
    return jwt.sign({ user: id }, process.env.JWT_ACCESS_TOKEN)
}
exports.userSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const useralreadyexist = await User.findOne({ where: { email: email } })
        if (useralreadyexist) {
            return res.status(404).json({ msg: 'user already exist' })
        }

        const saltround = 10
        bcrypt.hash(password, saltround, async (err, hash) => {
            await User.create({ name: username, email: email, password: hash })
            return res.status(200).json({ msg: 'user signup successfull', })
        })
    } catch (error) {
        return res.status(400).json({ msg: 'something went wrong' })
    }

}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const foundUser = await User.findOne({ where: { email: email } })
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, async (err, result) => {
                if (result) {
                    //updating the active status true as user is active now after login
                    const updateActive = await User.update(
                        { active: true },
                        { where: { id: foundUser.id } }
                    )
                    return res.status(200).json({ msg: 'login successfull', userId: foundUser.id, active: foundUser.active, token: generateJWTtoken(foundUser.id) })
                } else {
                    return res.status(403).json({ msg: 'incorrect password!!!' })
                }
            })
        }
        else {
            return res.status(404).json({ msg: 'incorrect email address' })
        }
    } catch (error) {

    }


}

exports.allUsers = async (req, res) => {
    const { GroupId } = req.body
    const notmembers = await User.findAll({
        where: {
            name:{ [Op.ne]:req.user.name},
        }
    })
    console.log(notmembers)
    return res.status(200).json({ users: notmembers})
}