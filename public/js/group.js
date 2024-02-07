const token = localStorage.getItem('token')
const groupsContainer = document.getElementById('chat-list')
const userId = localStorage.getItem('userId')
const GroupNameError = document.getElementById('GroupNameError')

const notAmemberError=document.getElementById('notAmemberError')
const GroupListContainer=document.getElementById('group-list')

//when reload i am storing all msgs to msgArray
window.addEventListener("DOMContentLoaded", async () => {
  const allGroups = await axios.get('/allGroupsData', { headers: { 'Authorization': token } })
  const groups = allGroups.data.groups
  // const usergroup=allGroups.data.usergroup
  showGroups(groups)
})

async function CreateGroup() {
  document.getElementById('add-group-button').addEventListener('click', async function (event) {
    event.preventDefault();
    const GroupNameInput = document.getElementById('groupname-input-field')
    if (GroupNameInput.value === '') {
      GroupNameError.innerHTML = 'Empty group name !!!'
      setTimeout(() => {
        GroupNameError.innerHTML = ''
      }, 2000)
    }
    else {
      try {
        let obj = {
          groupName: GroupNameInput.value,
          createdBy: userId
        }
        //adding group to table
        const data = await axios.post('/create-group', obj, { headers: { 'Authorization': token } })
        //getting that added group from table
        const newGroup = await axios.get('/new-group', { headers: { 'Authorization': token } })
        GroupNameInput.value = ''
        showGroups(newGroup.data.data)
      } catch (error) {
        GroupNameError.innerHTML = error.response.data.msg
        setTimeout(() => {
          GroupNameError.innerHTML = ''
        }, 2000)
      }
    }
  });
  // we are also able to add group when enter key is pressed by this code
  var GroupNameInputField = document.getElementById("groupname-input-field");
  GroupNameInputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("add-group-button").click();
    }
  });
}
CreateGroup()

async function showGroups(groups) {
  console.log(groups)
  groups.forEach(element => { 
      GroupListContainer.innerHTML += `<br><div class="member-left-div" style="border-bottom:1px groove #A060FF;" onclick="chatBox(${element.id},'${element.groupname}')">
      <h4>${element.groupname}</h4>
      </div>   
      
      <div class="member-right-div" id="JoinGroup">
      <a style="margin-left:30px; color:#A060FF;text-decoration:none" onclick="JoinGroup('${element.id}')"><i class="fa fa-sign-in" aria-hidden="true"></i></a>
      <a style="margin-left:30px; color:#00E4E3;text-decoration:none" onclick="chatBox(${element.id},'${element.groupname}')"><i class="fa-solid fa-message"></i></a>
      </div>
      
      <div class="member-list-clearfix"></div><br>
      ` 
 
  })

}

async function JoinGroup(GroupId) {
  try {
    let obj={
    GroupId:+GroupId,
    MyId:+userId,
    }
    console.log(obj)
    const data=await axios.post(`/join-group`,obj,{ headers: { 'Authorization': token }})

    } catch (error) {
        console.log(error.response.data.msg)
        notAmemberError.style.color='red'
        notAmemberError.innerHTML=error.response.data.msg
        setTimeout(()=>{
          notAmemberError.innerHTML=''
        },2000)
       
    }
}

async function Userlogout(e) {
  console.log('logout')
}

async function chatBox(GroupId,GroupName){
  try {
    const youareMemberOrnot=await axios.get(`/show-message/${GroupId}`,{ headers: { 'Authorization': token }})
    localStorage.setItem('GroupId', GroupId)
    localStorage.setItem('GroupName', GroupName)
    window.location.href = '/chat'
  } catch (error) {
    notAmemberError.innerHTML=error.response.data.msg
    setTimeout(() => {
      notAmemberError.innerHTML=''
    },2000);
  }

}

