import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets';
import './loginpopup.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {

    const {url,token,setToken} = useContext(StoreContext);
    const [data,setData] = useState({
      name: "",
      email: "",
      password:""
    });
    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
    }

    const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = url;
      if(currentSate==="Login"){
        newUrl += "/api/user/login";
      }
      else{
        newUrl += "/api/user/register";
      }
      const response = await axios.post(newUrl,data);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
      }
      else{
        alert(response.data.message);
      }
    }


    const [currentSate, setCurrentState] = useState("Login");
  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={onLogin}>
        <div className='login-popup-title'>
            <h2>{currentSate}</h2>
            <img src={assets.cross_icon} onClick={()=>setShowLogin(false)}/>
        </div>
        <div className='login-popup-input'>
            {
                currentSate==="Login"? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required/>
            }
            
            <input name='email' onChange={onChangeHandler} value={data.email} type='text' placeholder='Your Email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} placeholder='password' required/>
        </div>
        <button type='submit'>{currentSate==="SignUp"?"Create Account": "Login into Your Account"}</button>
        <div className='login-popup-condition'>
            <input type='checkbox' required/>
            <p>By Clicking I agree to the terms and Condition.</p>
        </div>
        {
            currentSate==="Login"?<p>Create a New Account? <span onClick={()=>setCurrentState("SignUp")}>Click Here</span></p>:<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login Here</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopup
