const username=document.getElementById('userName')
const email=document.getElementById('email') 
const password=document.getElementById('pwd')

const usernameError=document.getElementById('usernameError')
const emailError=document.getElementById('emailError')
const passwordError=document.getElementById('passwordError')

const token=localStorage.getItem('token')
async function UserLogin(e){
    e.preventDefault()
    try {
        if(email.value===''){
            emailError.innerHTML='Email Required*'
            setTimeout(()=>{
                emailError.innerHTML=''
            },1000)
        }
        else if(password.value===''){
            passwordError.innerHTML='Password Required*'
            setTimeout(()=>{
                passwordError.innerHTML=''
            },1000)
        }
        else{
            let obj={
                email:email.value,
                password:password.value,
            }
             const data=await axios.post('/userLogin',obj)
             localStorage.setItem('token',data.data.token)
             window.location.href='/chat'
        }
        
    } catch (error) {
        passwordError.innerHTML=error.response.data.msg
        setTimeout(()=>{
            passwordError.innerHTML=''
        },1000)
        console.log(error.response.data.msg)
    }

}

async function UserSignup(e){
    e.preventDefault() 
    try {

        if(username.value===''){
            usernameError.innerHTML='Username Required*'
            setTimeout(()=>{
                usernameError.innerHTML=''
            },1000)
        }
        else if(email.value===''){
            emailError.innerHTML='Email Required*'
            setTimeout(()=>{
                emailError.innerHTML=''
            },1000)
        }
        else if(password.value===''){
            passwordError.innerHTML='Password Required*'
            setTimeout(()=>{
                passwordError.innerHTML=''
            },1000)
        }
        else{
            let obj={
                username:username.value,
                email:email.value,
                password:password.value,
            }
            await axios.post('/userSignup',obj)
            window.location.href='/firstmsg'
        }
    } catch (error) {
        emailError.innerHTML='Email Already Exist !!!'
        setTimeout(()=>{
            emailError.innerHTML=''
        },1000)
        console.log(error)
    }
}