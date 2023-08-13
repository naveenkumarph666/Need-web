import { AppBar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Paper, TextField, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import './style.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Myprofile() {
    let navigate=useNavigate()
    const [data,setData] = useState([]);
    const [able,setAble]= useState(true);
    const [able1, setAble1] = useState(true);
    const [able2, setAble2] = useState(true);
    const [able3, setAble3] = useState(true);
    const [name,setName]= useState('');
    const [mobile,setMobile] = useState('');
    const [mailId,setMailId]=useState('');
    const [dob,setDob]= useState('');
    const [username,setUsername]=useState('');
    const [data1,setData1]=useState([]);
    useEffect(()=>{
        const name1= localStorage.getItem('username');
        setUsername(name1);
        if (name1 === '' || name1 === null) {
            navigate('/');
        }
        else {
                loadItems();
        }
        
    },[])
    const logoutDashboard = () => {
        localStorage.removeItem('username');
        navigate('/');
    }
    const loadItems=async(a)=>{
        await axios.get(`http://localhost:4000/User`).then((res) => {
           res.data.filter(data=>{return data.username === localStorage.getItem('username')}).map(data=>{
                  setName(data.username);
                  setMobile(data.mobile);
                  setMailId(data.mailId);
                  setDob(data.dob);
           })
            setData(res.data)
        })
      
    }
    const updateDetails=(a,b,c,d,f,g,h)=>{
       const result = axios.get('http://localhost:4000/User');
        data.map(async(data)=>{
            if(data.id===f)
            {
                let details = {username:a,mobile:b,mailId:c,dob:d,password:g,confirmpassword:h}
                await axios.put(`http://localhost:4000/User/${data.id}`, details).then(async () => { await navigate('/') }).then(async () => {await window.alert('Your details got Updated!') });
            }
        })
    }
    const deleteDetails=async(a)=>{
       let isDelete = window.confirm('Are you sure? You wanted to delete your account?');
       if(isDelete)
       {
        data.map(async(data)=>{
            if(data.id===a)
            {
               await axios.delete(`http://localhost:4000/User/${data.id}`).then(()=>navigate('/'))
            }
        })
    }
    }
    const handleAble=(a,e,c)=>{
        if(able===false && c==='username')
        {
            setName(e.target.value);
        }
        if (able1 === false && c === 'mobile')
        {
            setMobile(e.target.value);
        }
        if (able2 === false && c === 'mailId')
        {
            setMailId(e.target.value);
        }
        if (able3 === false && c === 'dob')
        {
            setDob(e.target.value);
        }
    }
    const clickAble=(a,c)=>{
        if ( c === 'username')
        {
            setAble(!able);
            if(able===true)
            {
                setName(a);
            }
        }
        if ( c === 'mobile') {
            setAble1(!able1);
            if (able1 === true) {
                setMobile(a);
            }
            
        }
        if ( c === 'mailId') {
            setAble2(!able2);
            if (able2 === true) {
                setMailId(a);
            }

        }
        if (c === 'dob') {
            setAble3(!able3);
            if (able3 === true) {
                setDob(a);
            }

        }
    }
    const theme = createTheme({
        palette: {
            primary: {
                light: '#FCC8D1',
                main: '#cadfdf',
                dark: '#757ce8',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: 'whiteSmoke',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    })
    return (<>
        <ThemeProvider theme={theme}>
            <Box sx={{ display: { xs: 'in-line block', sm: 'block' } }}>
                <AppBar sx={{ flexGrow: 1 }}>
                    <Toolbar>
                        <AccountCircleIcon sx={{ marginRight: '10px', fontSize: '30px' ,color: 'black' }} />
                        <Typography variant='h5' sx={{ flexGrow: 1, color: 'black' }}>MY PROFILE</Typography>
                        <Button sx={{ color: 'black', display: { xs: 'inline-block', sm: 'inline-block' } }} class='login-button' onClick={()=>navigate('/Dashboard')}>BACK</Button>
                        <Button sx={{ color: 'black', display: { xs: 'none', sm: 'inline-block' } }} class='login-button' onClick={() => logoutDashboard()}>LOGOUT</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
        <Box sx={{ marginTop: '70px', marginLeft: '230px', display: { xs: 'none', sm: 'block' } ,marginBottom:'20px'}}>
            {data.filter(data => data.username === username).map(data=><Card sx={{ maxWidth: 800,boxShadow:20 // theme.shadows[20]
            }}>
                <CardHeader action={<IconButton aria-label="My Profile">
                    <MoreVertIcon sx={{color:"black"}}/>
                </IconButton>} title='MY PROFILE' sx={{ textAlign: 'center', backgroundColor:'#cadfdf',marginBottom:'10px',color:'black'}}/>
                <Paper sx={{marginLeft:'150px',marginRight:'150px',height:'100px',width:'400px',padding:'50px',marginBottom:'50px',backgroundColor:'black'}}>
                <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/profile-design-template-4c23db68ba79c4186fbd258aa06f48b3_screen.jpg?ts=1581063859" alt="Avatar" style={{borderBottom:'solid',borderRadius:'50%',height:'150px',width:'150px',marginLeft:'115px',marginTop:'15%',position:"sticky",marginBottom:'30px'}}></img>
                </Paper>
                <CardContent sx={{textAlign:'center',padding:'20px'}}>
                 <Typography variant='h5'>
                        <strong><BadgeIcon sx={{ paddingRight: '10px' }} /><TextField label="Name" variant="standard" value={name} name='username' inputProps={{readOnly:able}}  onChange={(e)=>handleAble(data.username,e,'username')} /></strong>
                        <IconButton size="small" aria-label="Edit" sx={{ textAlign: 'left' }} onClick={() => clickAble( data.username,'username')}>
                    <EditIcon/>
                </IconButton>
                 </Typography>
                 <Typography variant='h5'>
                        <strong><PhoneIcon sx={{ paddingRight: '10px' }} /><TextField label="Mobile" variant="standard" value={mobile} name='mobile' inputProps={{ readOnly: able1 }} onChange={(e) => handleAble(data.mobile, e, 'mobile')} /></strong>
                        <IconButton size="small" aria-label="Edit" sx={{ textAlign: 'left' }} onClick={() => clickAble(data.mobile,'mobile')}>
                    <EditIcon/>
                </IconButton>
                 </Typography>
                 <Typography variant='h5'>
                        <strong><EmailIcon sx={{ paddingRight: '10px' }} /><TextField label="Mail Id" variant="standard" value={mailId} name='mailId' inputProps={{ readOnly: able2 }}  onChange={(e) => handleAble(data.mailId, e, 'mailId')} /></strong>
                        <IconButton size="small" aria-label="Edit" sx={{ textAlign: 'left' }} onClick={() => clickAble(data.mailId,'mailId')}>
                    <EditIcon/>
                </IconButton>
                 </Typography>
                 <Typography variant='h5'>
                        <strong> <EventIcon sx={{ paddingRight: '10px' }} /><TextField label="Date Of Birth" variant="standard" value={dob} name='dob' inputProps={{ readOnly: able3}} onChange={(e) => handleAble(data.dob, e, 'dob')} /></strong>
                        <IconButton size="small" aria-label="Edit" sx={{ textAlign: 'left' }} onClick={() => clickAble(data.dob, 'dob')}>
                    <EditIcon/>
                </IconButton>
                 </Typography>
                </CardContent>
                <CardActions className="profile-actions" >
                    <Button sx={{ cursor: 'pointer',boxShadow:5 }} variant="body2" onClick={()=>deleteDetails(data.id)}>
                <DeleteIcon/>REMOVE
              </Button>
                    <Button sx={{ cursor: 'pointer',boxShadow:5}} variant="body2" onClick={()=>updateDetails(name,mobile,mailId,dob,data.id,data.password,data.confirmpassword)}>
                <UpgradeIcon/>UPDATE
              </Button>
                </CardActions>
            </Card>)}
        </Box>
        <Box sx={{ marginTop: '70px', marginLeft: '50px', display: { xs: 'block', sm: 'none' },marginBottom:'20px'}}>
            {data.map(data=><Card sx={{ maxWidth: 300,boxShadow:20// theme.shadows[20]
            }} >
                <CardHeader action={<IconButton aria-label="Settings">
                    <MoreVertIcon sx={{color:'black'}}/>
                </IconButton>} title='MY PROFILE' sx={{ textAlign: 'center', backgroundColor:'#cadfdf',marginBottom:'10px',color:'black'}} />
                <Paper sx={{marginLeft:'10px',marginRight:'10px',height:'100px',width:'200px',padding:'40px',marginBottom:'30px',backgroundColor:'black'}}>
                <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/profile-design-template-4c23db68ba79c4186fbd258aa06f48b3_screen.jpg?ts=1581063859" alt="Avatar" style={{borderBottom:'solid',borderRadius:'50%',height:'150px',width:'150px',marginLeft:'25px',marginTop:'15%',position:"sticky",marginBottom:'30px'}}></img>
                <CardMedia sx={{ height: 250 }} title='My Profile' />
                </Paper>
                <CardContent>
                <Typography variant='h5'>
                        <strong><BadgeIcon sx={{ paddingRight: '10px' }} /><TextField label="Name" variant="standard" value={name} inputProps={{ readOnly: able }} onChange={(e) => handleAble(data.username, e, 'username')} /></strong>
                        <IconButton size="small" aria-label="Edit" sx={{ textAlign: 'left' }} onClick={() => clickAble(data.username, 'username')}>
                            <EditIcon />
                        </IconButton>
                 </Typography>
                 <Typography variant='h5'>
                        <strong><PhoneIcon sx={{ paddingRight: '10px' }} /><TextField label="Mobile" variant="standard" value={mobile} inputProps={{ readOnly: able1 }} onChange={(e) => handleAble(data.mobile, e, 'mobile')} /></strong>
                        <IconButton size="small" aria-label="Edit" sx={{ textAlign: 'left' }} onClick={() => clickAble(data.mobile, 'mobile')}>
                            <EditIcon />
                        </IconButton>
                 </Typography>
                 <Typography variant='h5'>
                        <strong><EmailIcon sx={{ paddingRight: '10px' }} /><TextField label="Mail Id" variant="standard" value={mailId} inputProps={{ readOnly: able2 }} onChange={(e) => handleAble(data.mailId, e, 'mailId')} /></strong>
                        <IconButton size="small" aria-label="Edit" sx={{ textAlign: 'left' }} onClick={() => clickAble(data.mailId, 'mailId')}>
                            <EditIcon />
                        </IconButton>
                 </Typography>
                 <Typography variant='h5'>
                        <strong> <EventIcon sx={{ paddingRight: '10px' }} /><TextField label="Date Of Birth" variant="standard" value={dob} inputProps={{ readOnly: able3 }} onChange={(e) => handleAble(data.dob, e, 'dob')} /></strong>
                        <IconButton size="small" aria-label="Edit" sx={{ textAlign: 'left' }} onClick={() => clickAble(data.dob, 'dob')}>
                            <EditIcon />
                        </IconButton>
                 </Typography>
                </CardContent>
                <CardActions className='profile-actions'>
                    <Button sx={{ cursor: 'pointer', boxShadow: 2 }} variant="body2" className='profile-button' onClick={() => deleteDetails(data.id)}>
                <DeleteIcon/>Remove
              </Button>
                    <Button sx={{ cursor: 'pointer', boxShadow: 2 }} variant="body2" className='profile-button' onClick={() => updateDetails(name, mobile, mailId, dob, data.id)}>
                <UpgradeIcon/>Update
              </Button>
                </CardActions>
            </Card>)}
        </Box>
    </>)
}
export default Myprofile;