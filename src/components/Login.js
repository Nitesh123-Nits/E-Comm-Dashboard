import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate=useNavigate();
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    useEffect(()=>{
      const auth=localStorage.getItem('user')
      if(auth){
        navigate('/')
      }
    })

    const emailHandler=(e)=>{
        setEmail(e.target.value)
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value)
    }

    const loginForm=async ()=>{
        let result=await fetch('http://localhost:5000/login',
          {
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
              'Content-Type':'application/json'
            },
        });
        result=await result.json()
        // console.log(result)
        if(result.auth){
          localStorage.setItem("user",JSON.stringify(result.user))
          localStorage.setItem("token",JSON.stringify(result.auth))
          navigate('/')
        }
        else{
          alert("Please enter correct details.")
        }
      
       
    }
  return (
    <div className="form">
    <div className="form-container">
        <h1>Login</h1>
        <form>
        <input className='input-email' type='email' placeholder='Enter your mail id' value={email}  onChange={emailHandler}/>
        <input className='input-password' type='password' placeholder='Password' value={password}  onChange={passwordHandler}/>
        <button onClick={loginForm} type="button">Login</button>
        </form> 
    </div>
 </div>
  )
}

export default Login