import React, { useEffect, useState } from "react";
import './login.css';
import axios from "axios";
import { FormControl, FormControlLabel } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from "react-router-dom";
const Login = () => {
    let navigate = useNavigate();
    const [data,setData]=useState([]);
    const [data1,setData1]=useState({
        username:'',
        password:''
    })
    const [type,setType]=useState('password');
    const handleType=()=>{
        if(type === 'password')
        {
            setType('text');
        }
        else if(type==='text')
        {
            setType('password')
        }
    }
    useEffect(()=>{
        axios.get('http://localhost:4000/User').then(res=>setData(res.data));
    },[])
    
    const handleLogin=(e)=>{
        setData1({...data1,[e.target.name]:e.target.value})
    }

    const validateLogin=async()=>{
        data.map(data=>{
            if(data.username==='' || data.username===null)
            {
                window.alert('Please Enter Username');
            }
            else if(data.password==='' || data.password===null)
            {
                window.alert('Please Enter Password');
            }
            else if(data.username === data1.username)
            {
                if(data.password === data1.password)
                {
                     localStorage.setItem('username',data1.username)
                     navigate('/Dashboard');
                }
                else{
                    window.alert('Password Invalid');
                }
            }
        })

    }
    return (
        < div className='login-body'>
            <div class='login-Form'>
                <form >
                    <h3 className='login-header'>LOGIN FORM</h3>
                    <h5>USERNAME:<input type='text' name='username' placeholder="Enter your username" onChange={(e)=>handleLogin(e)}/></h5>
                    <h5>PASSWORD:<input type={type} name='password' placeholder='Enter your password' onChange={(e) => handleLogin(e)} /></h5>
                    <input type='checkbox' onClick={()=>handleType()}/>Show Password
                    <div class='front-button'>
                        <button className='button-a' onClick={()=>validateLogin()}>LOGIN</button>
                        <button className='button-b' onClick={()=>navigate('/Register')}>REGISTER</button>
                    </div>
                    Don't have an Account?<a href='/Register'> SIGN UP.</a>
                </form>
                <div className='txt-centered'><ShoppingCartIcon sx={{fontSize:'40px'}}/>SHOP WITH NEED</div>
                <p className='txt-down'>- Shop with Need mart for finding best mobiles. Need with Latest branded mobiles of India and All smartphones from top  & best companies. Trusted by 50+ million people allover India.</p>
            </div></div>)
}
export default Login;