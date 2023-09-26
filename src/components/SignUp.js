import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate=useNavigate();
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    useEffect(()=>{
      const auth=localStorage.getItem('user')
      if(auth){
        navigate('/')
      }
    })
 
    const inputHandler=(e)=>{
    setName(e.target.value);
    }

    const emailHandler=(e)=>{
        setEmail(e.target.value)
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value)
    }

    const submitForm=async ()=>{
        let result=await fetch('http://localhost:5000/signup',
          {
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
              'Content-Type':'application/json'
            },
        });
        result=await result.json()
        console.log(result)
        if(name && password && email){
          localStorage.setItem("user",JSON.stringify(result.result))
          localStorage.setItem("token",JSON.stringify(result.auth))
          navigate('/')
        }
        else{
          alert("Enter your details properly")
        }
     
    }
  return (
    <div className="form">
    <div className="form-container">
        <h1>SignUp</h1>
        <form>
        <input className='input-name' type='text' placeholder='Enter your name' value={name} onChange={inputHandler} required/>
        <input className='input-email' type='email' placeholder='Enter your mail id' value={email}  onChange={emailHandler} required/>
        <input className='input-password' type='password' placeholder='Password' value={password}  onChange={passwordHandler} required/>
        <button onClick={submitForm} type="submit">SignUp</button>
        </form> 
    </div>
 </div>
  )
}

export default Signup