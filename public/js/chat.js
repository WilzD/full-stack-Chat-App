
const token = localStorage.getItem('token')
const GroupId=localStorage.getItem('GroupId')
const GroupName=localStorage.getItem('GroupName')
const UserId=localStorage.getItem('userId')

const chatContainer = document.getElementById('chat-container')
const GroupnameH4=document.getElementById('groupNameH4')


//when reload i am storing all msgs to msgArray
window.addEventListener("DOMContentLoaded", async () => {
    GroupnameH4.innerHTML=`
    <h4>${GroupName}<br><span onclick="groupInfo()">tap here for group info</span></h4>`
    const allMsg = await axios.get(`/show-message/${GroupId}`,{ headers: { 'Authorization': token } })
    console.log(allMsg.data.allMsg)
    showMsgs(allMsg.data.allMsg)
})

async function msgSend() {
    try {
        document.getElementById('msg-send-button').addEventListener('click', async function (event) {
            event.preventDefault();
            const msgInput = document.getElementById('msg-input-field')
            let obj={
                msg:msgInput.value,
                groupId:GroupId
            }
            const sendingMsgToBackend = await axios.post('/store-message',obj,{ headers: { 'Authorization': token } })
            console.log(sendingMsgToBackend)
            showMsgs()
            msgInput.value =''
            
        });


        //when enter key is pressed this condition will run
        var inputField = document.getElementById("msg-input-field");
        inputField.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("msg-send-button").click();
            }
        });


    } catch (error) {
        console.log(error)
    }

}
msgSend()

//here i am storing the last message value of chats we have, as soon it is become less it means there is a new message and i will print that message asap,
//tada...!! my app is real time now
let oldMsgId;
function showMsgs(allMsg){
    allMsg.forEach(element =>{
         if(element.userId==UserId){
            const utcTimestamp = new Date(`${element.createdAt}`);
            const istTime = utcTimestamp.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata',hour: '2-digit', minute: '2-digit' });
            const MyMsgContainer = document.getElementById("chat-container")
            MyMsgContainer.innerHTML += `<div class="message-box my-message">
                <p>
                ${element.message}<br><span>${istTime}</span>
                </p>
              </div>`
             oldMsgId=element.id
         }
         else{
            const utcTimestamp = new Date(`${element.createdAt}`);
            const istTime = utcTimestamp.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata',hour: '2-digit', minute: '2-digit' });
            const othersMsgContainer = document.getElementById("chat-container")
            othersMsgContainer.innerHTML += `<div class="message-box friend-message">
                <p>
                <span style="color:#A060FF;">~${element.sendername}</span>
                ${element.message}<br><span>${istTime}</span>
                </p>
              </div>`
              oldMsgId=element.id
         }
    })
}

function groupInfo(){
   window.location.href='/groupInfo'
   //redirecting to group.js file
  }



// this is going to ask the backend is that any new message
//i have a last message id  which i stored at the time i enter the chat page
//now as below function asking the backend every one second that is there any new msg(i.e; new message id)
// i am comparing both and on basis of that i am printing the new message
let newMsgId;
// setInterval(async()=>{
//     const newMsg = await axios.get('/new-message', { headers: { 'Authorization': token } })
//     newMsgId =newMsg.data.msgdata[0].id
//     if (newMsgId > oldMsgId) {
//         if(newMsg.data.msgdata[0].userId==userId){
//             const data=newMsg.data.msgdata[0].message
//             console.log(newMsgId,oldMsgId)
//             const div = document.createElement('div')
//             div.className = 'message-box my-message'

//             const div_p = document.createElement('p')
//             const msg = document.createTextNode(`${data}`)

//             div_p.appendChild(msg)
//             div.appendChild(div_p)

//             chatContainer.appendChild(div)
//             oldMsgId++
//         }
//         else{

//             const data=newMsg.data.msgdata[0].message
//             console.log(newMsgId,oldMsgId)
//             const div = document.createElement('div')
//             div.className = 'message-box friend-message'

//             const div_p = document.createElement('p')
//             const msg = document.createTextNode(`${data}`)

//             div_p.appendChild(msg)
//             div.appendChild(div_p)

//             chatContainer.appendChild(div)
//             oldMsgId++
//         }
        
//     }
// },1000)


