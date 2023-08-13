import React, { useEffect, useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register=()=>{
    let navigate =useNavigate();
    const[data1,setData1]=useState([]);
    const [data,setData]=useState({
        username:'',
        mobile:'',
        mailId:'',
        dob:'',
        password:'',
        confirmpassword:'',
    });
    
    useEffect(()=>{
        axios.get('http://localhost:4000/User').then(res=>setData1(res.data))
    },[])
    const handleRegister=async(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const registerUser=async()=>{
        let result = false;
        data1.map((data1)=>{
            if (data1.mailId === data.mailId) {
                result=true;
            }
        })
        if(result)
        {
            window.alert('User already Registered!!');
            navigate('/')
        }
        else 
        {
            if(!result){
                if(data.password.length>=8 && data.password.length<=16)
                {
                if(data.password === data.confirmpassword)
                {
                    if(data.username==='' || data.username===null)
                    {
                         window.alert('username must be filled!!')
                    }
                    else if(data.mailId==='' || data.mailId===null)
                    {
                        window.alert('mail id must be filled!!')
                    }
                    else if(data.mobile==='' || data.mobile===null)
                    {
                        window.alert('mobile must be filled!!')
                    }
                    else if(data.dob==='' || data.dob===null)
                    {
                        window.alert('dob must be filled!!')
                    }
                    else if(data.password==='' || data.password===null){
                        window.alert('password must be filled!!')
                    }
                    else if(data.confirmpassword==='' || data.confirmpassword===null)
                    {
                        window.alert('confirm password must be filled!!')
                    }
                    else
                    {
                    await axios.post('http://localhost:4000/User', data).then(
                        navigate('/')
                    );
                    window.alert('You have been Registered Successfully!!!')
                    }
                }
                else
                {
                    window.alert('Password Not Matched!!!');
                }
            }
            else{
                window.alert('Password must be b/w 8 to 16 chars');
            }
        }
    }
    }
    return(
        <div className='register-body'>
        <form className='register-form'>
                <h3 className='register-header'>REGISTER FORM</h3>
                <h5>NAME:<input type='text' name='username' placeholder='Please Enter your fullname' onChange={(e) => handleRegister(e)} required /></h5 >
                <h5>MOBILE:<input type='text' name='mobile' placeholder='Enter your mobile no.' onChange={(e) => handleRegister(e)} required /></h5 >
                <h5>MAIL ID:<input type='email' name='mailId' placeholder='Enter your mail Id' onChange={(e) => handleRegister(e)} required /></h5 >
                <h5>DOB:<input type='text' name='dob' placeholder='DD/MM/YYYY' onChange={(e) => handleRegister(e)} required /></h5 >
                <h5> PASSWORD:<input type='password' name='password' placeholder="set your password" onChange={(e) => handleRegister(e)} required /></h5 >
                <h5> CONFIRM PASSWORD:<input type='text' name='confirmpassword' placeholder="Confirm your password" onChange={(e) => handleRegister(e)} required /></h5 >
                    <input type='checkbox' />Agree to <a>Terms & Conditions</a>
                    <div class='register-button'>
                    <button className='button-c' type='submit' onClick={()=>registerUser()}>REGISTER</button>
                </div>
                Already have an Account?<a href='/'>SIGN IN</a>
        </form>
            <div className='txt1-centered'><ShoppingCartIcon sx={{ fontSize: '30px' }} />SHOP WITH NEED</div>
            <p className='txt1-down'>- Shop with Need mart for finding best mobiles. Need with Latest branded mobiles of India and All smartphones from top  & best companies. Trusted by 50+ million people allover India.</p>
        </div>
    )
}
export default Register;