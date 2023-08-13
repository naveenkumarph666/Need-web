import { AppBar, Box, Button, ButtonBase, Grid, Paper, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartSkeleton from "./CartSkeleton";
const Order=()=>{
  const [isLoading,setIsLoading]=useState(true);
  const [total,setTotal]=useState()
  const [data,setData]=useState([])
  
  let navigate = useNavigate();
 
    useEffect(()=>{
      const name = localStorage.getItem('username');
      if (name === '' || name === null) {
        navigate('/');
      }
      else {
      setTimeout(()=>{
        loadItems1();
      },1000)
    }
    },[])
  const logoutDashboard = () => {
    localStorage.removeItem('username');
    navigate('/');
  }
  const loadItems1=()=>{
    var totalPrice=0;
    
    axios.get('http://localhost:4000/Orders').then(res=>{setData(res.data)
    {
        res.data.map(data => {
          totalPrice += data.Quantity * data.Price
        })
        setTotal(totalPrice)
      }
      setIsLoading(false);
    })
  }

  const cancelOrder=async()=>{
    const result = await axios.get('http://localhost:4000/Orders')
    const res = window.confirm('Are you sure? you wanted to delete the orders');
    if(res){
   { 
    for(let i=0;i<data.length;i++)
    {
      const items = data[i];
      const deleteResp = await axios.delete(`http://localhost:4000/Orders/${items.id}`);
    }
      await navigate('/Dashboard');
   }
    }
  }
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });
    const theme = createTheme({
        palette:{
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
    return(<>
    <ThemeProvider theme={theme}>
    <Box sx={{display:{xs:'inline-block',sm:'block'}}}>
    <AppBar sx={{flexGrow:1}}>
        <Toolbar>
        <BusinessCenterIcon sx={{ marginRight: '10px', fontSize: '30px',color:'black' }}/>
        <Typography variant='h5' color='black' sx={{flexGrow:1}}>
            YOUR ORDERS
        </Typography>
              <Button sx={{ color: 'inherit', display: { xs: 'inline-block', sm: 'inline-block' } }} class='login-button' onClick={()=>navigate('/Dashboard')}>BACK</Button>
              <Button sx={{ color: 'inherit', display: { xs: 'none', sm: 'inline-block' } }} class='login-button' onClick={() => logoutDashboard()}>LOGOUT</Button>
        </Toolbar>
    </AppBar>
    </Box>
    </ThemeProvider>
    {isLoading?
    <div>
    <Box sx={{ marginTop: '70px', marginLeft: '400px' }}>
      <CartSkeleton />
      <br></br>
      <CartSkeleton />
      <br></br>
      <CartSkeleton />
      <br></br>
      <CartSkeleton />
      <br></br>
      <CartSkeleton />
      <br></br>
      <CartSkeleton />
      <br></br>
      <CartSkeleton />
      <br></br>
      <CartSkeleton />
      <br></br>
      <CartSkeleton />
      <br></br>
    </Box>
  </div>
    :data.map(data=>{
        return(<Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#cadfdf',
      marginTop:'70px',
        boxShadow: 10, // theme.shadows[20]
    }}
    >
        <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={data.Img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="h6" gutterBottom>
               {data.Model}
              </Typography>
              <Typography variant="h6" gutterBottom>
               Quantity:{data.Quantity}
              </Typography>
              <Typography variant="h6" color="text.secondary">
              <CurrencyRupeeIcon sx={{ fontSize: '15px' }} />{data.Price*data.Quantity}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Paper>)})}
    {isLoading?
     <div>
     <Box sx={{ marginTop: '70px', marginLeft: '400px' }}>
      <CartSkeleton/>
      </Box>
      </div>
    :<Paper sx={{
      p: 2,
      margin: 'auto',
      maxWidth: 500,
      flexGrow: 1, marginTop: '20px', 
        boxShadow: 10, // theme.shadows[20]
      
    }}>
      <Grid container>
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography variant='h5' sx={{ textAlign: 'left' }}>Total Price</Typography></Grid>
          <Grid item><Button class='place-order' onClick={()=>cancelOrder()}>CANCEL</Button></Grid>
        <Grid item><Typography variant='h5'><CurrencyRupeeIcon sx={{width:'20px',height:'20px'}} />{total}</Typography></Grid>
      </Grid>
    </Paper>}
    
    </>)
}
export default Order;