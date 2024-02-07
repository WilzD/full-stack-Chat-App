const Group = require('../model/group')
const User = require('../model/user')
const UserGroup = require('../model/UserGroup')
const sequelize = require('../path/database')


exports.createGroup = async (req, res) => {
    try {
        const { groupName } = req.body
        const groupExist = await Group.findOne({ where: { groupname: groupName } })
        if (groupExist) {
            return res.status(400).json({ msg: 'Group already exists !!!' })
        }
        else {
            const createGroup = await Group.create({ groupname: groupName, createdby: req.user.name })
            const userGroup = await UserGroup.create({
                groupname: createGroup.groupname, username: req.user.name, isadmin: true, groupId: createGroup.id, userId: req.user.id
            })
            return res.status(200).json({ userGroup: userGroup })
        }

    } catch (error) {
        console.log(error)
        return res.status(402).json({ msg: 'Unable to create group !!! ' })
    }
}

exports.allGroupsData = async (req, res) => {
    try {
        //fetching all group
        const groups = await Group.findAll()
        return res.status(200).json({ groups: groups })
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: 'Unable to fetch all groups!!!' })
    }
}

exports.newGroup = async (req, res) => {
    try {
        const data = await UserGroup.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']]
        })
        return res.status(200).json({ data: data })
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Unable to fetch new group!!!" })
    }
}

exports.groupInfo = async (req, res) => {
    try {
        const { GroupId } = req.params

        //finding that specific group
        // const findingGroup = await UserGroup.findOne({ where: { groupId: GroupId } })

        //finding all users related to that group
        const getallusersofgroup = await UserGroup.findAll({
            where: { groupId: GroupId }
        });
        return res.status(200).json({ Allmembers: getallusersofgroup })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "unable to fetch group info" })
    }
}
exports.addNewUserTogroup = async (req, res) => {
    try {
        const { GroupId, FriendId } = req.body
        const userAlreadyInGrroup = await UserGroup.findAll({ where: { groupId: GroupId, userId: +FriendId } })
        if (userAlreadyInGrroup) {
            return res.status(400).json({ msg: 'user already a group member' })
        }
        else {
            //finding that existing group with given group id
            const findingGroup = await Group.findOne({ where: { id: GroupId } })
            //finding that existing friend with given friend id
            const findingUser = await User.findOne({ where: { id: FriendId } })

            // //now adding this user and group to third party tabel usergroup
            const addNewUsers = await UserGroup.create({ groupname: findingGroup.groupname, username: findingUser.name, isadmin: false, groupId: findingGroup.id, userId: findingUser.id });
            return res.status(201).json(addNewUsers);
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "unable to add user to group" })
    }

}

exports.joinGroup = async (req, res) => {
    try {
        const { GroupId, MyId } = req.body
        const userAlreadyInGrroup = await UserGroup.findOne({ where: { groupId: GroupId, userId: MyId } })
        if (userAlreadyInGrroup) {
            return res.status(400).json({ msg: 'you are already a member of this group' })
        } else {
            //finding that existing group with given group id
            const findingGroup = await Group.findOne({ where: { id: GroupId } })

            //finding that existing friend with given friend id
            const findingUser = await User.findOne({ where: { id: MyId } })

            // //now adding this user and group to third party tabel usergroup
            const addNewUsers = await UserGroup.create({ groupname: findingGroup.groupname, username: findingUser.name, isadmin: false, groupId: findingGroup.id, userId: findingUser.id });
            // return res.status(201).json(addNewUsers); 
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "unable to join group" })
    }

}

exports.deleteMemberFromgroup = async (req, res) => {
    try {
        const { id } = req.params
        const delUser = await UserGroup.destroy({ where: { id: id } })
        return res.status(201).json({ msg: 'member deleted succesfully' })
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: 'unable to remove member' })
    }
}

exports.makeAdmin = async (req, res) => {
    try {
        const { GroupId, UserId } = req.body
        const findingUser = await UserGroup.findOne({ where: { id: GroupId, userId: UserId } })
        const updatingAdmin = await findingUser.update({ isadmin: true })
        updatingAdmin.save()
        return res.status(200).json({ msg: 'admin added succesfully' })
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "unable to make admin" })
    }

}


