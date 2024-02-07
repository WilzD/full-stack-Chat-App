const GroupId = localStorage.getItem('GroupId')
const token = localStorage.getItem('token')

const memberListContainer = document.getElementById('member-list')
const addmemberListContainer = document.getElementById('add-member-list')

const AddUserError = document.getElementById('AddUserError')

const GroupName = localStorage.getItem('GroupName')
const GroupnameH4 = document.getElementById('groupNameH4')

window.addEventListener("DOMContentLoaded", async () => {
    ShowGroupInfo()
})

async function ShowGroupInfo() {
    try {
        //showing group name at top
        GroupnameH4.innerHTML = `<h4>${GroupName}<br><span></span></h4>`
        const groupInfo = await axios.get(`/groupInfo/${GroupId}`, { headers: { 'Authorization': token } })
        const memberList = groupInfo.data.Allmembers
        memberList.forEach(element => {
            console.log(element)
            if (element.isadmin == 1) {
                memberListContainer.innerHTML += `
                <div class="member-left-div" style="border-bottom:1px groove #00E4E3;">
                <span>${element.username}</span>
                </div>
                
                <div class="member-right-div" >
                <a style="margin-left:30px; color:#A060FF;text-decoration:none"><span style="color:#00E4E3; text-align-center">Admin</span></a>
                </div>
                
                <div class="member-list-clearfix"></div><br>
                `
            } else if (element.isadmin == 0) {
                memberListContainer.innerHTML += `
                <div class="member-left-div" style="border-bottom:1px groove #A060FF">
                <span>${element.username}</span>
                </div>
                
                <div class="member-right-div">
                    <a style="margin-left:15px; color:#A060FF" onclick="deleteMember(${element.id})"><i class="fa fa-trash" ></i></a>
                    <a style="margin-left:15px; color:#A060FF" onclick="makeAdmin(${element.id},${element.userId})"><i class="fa fa-id-badge" aria-hidden="true"></i></a>
                </div>
                
                <div class="member-list-clearfix"></div><br>
        
                `
            }
        });
    } catch (error) {
        console.log(error)
    }

}


function searchMember(e) {
    e.preventDefault()
    const inputField = document.getElementById('search-member-input-box')
    if (inputField.style.display == "block") {
        inputField.style.display = "none"
    } else {
        inputField.style.display = "block"
    }
    console.log('search member')
}

async function deleteMember(id) {
    try {
        const data = await axios.delete(`/delete-member/${id}`, { headers: { 'Authorization': token } })
        console.log(data)
        AddUserError.style.color = 'green'
        AddUserError.innerHTML = 'remove successfully'
        setTimeout(() => {
            AddUserError.innerHTML = ''
            window.location.href = '/groupInfo'

        }, 2000)
    } catch (error) {
        console.log(error.response.data.msg)
        AddUserError.style.color = 'red'
        AddUserError.innerHTML = error.response.data.msg
        setTimeout(() => {
            AddUserError.innerHTML = ''
        }, 2000)
    }

}


async function makeAdmin(id,userid){
    try {
       let obj={
        GroupId:id,
        UserId:userid 
        }
        const makeadmin=axios.put(`/make-admin`,obj,{headers:{  'Authorization': token }})
        AddUserError.style.color = 'green'
        AddUserError.innerHTML = 'admin added succesfully successfully'
        setTimeout(() => {
            AddUserError.innerHTML = ''
            window.location.href = '/groupInfo'

        }, 2000)
    } catch (error) {
        console.log(error.response.data.msg)
        AddUserError.style.color = 'red'
        AddUserError.innerHTML = error.response.data.msg
        setTimeout(() => {
            AddUserError.innerHTML = ''
        }, 2000)
        
    }


}
{/* <a style="margin-left:15px; color:#A060FF"  onclick="AddMember(${element.id})"><i class="fa fa-plus"></i></a> */ }


// async function AddMember(FriendId) {
    //     try {
    //         let obj = {
    //             GroupId: +GroupId,
    //             FriendId: FriendId,
    //         }
    //         const data = await axios.post(`/add-new-user-to-group`, obj, { headers: { 'Authorization': token } })
    //         AddUserError.style.color = 'green'
    //         AddUserError.innerHTML = 'added successfully'
    //         setTimeout(() => {
    //             AddUserError.innerHTML = ''
    //         }, 2000)
    
    //     } catch (error) {
    //         console.log(error.response.data.msg)
    //         AddUserError.style.color = 'red'
    //         AddUserError.innerHTML = error.response.data.msg
    //         setTimeout(() => {
    //             AddUserError.innerHTML = ''
    //         }, 2000)
    
    //     }
    
    // }