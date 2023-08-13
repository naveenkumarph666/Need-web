import { AppBar, Box, Button, ButtonBase, Grid, Paper, ThemeProvider, Toolbar, Typography, createTheme, styled } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartSkeleton from "./CartSkeleton";
const Favorites=()=>{
  const [isLoading,setIsLoading] = useState(true);
  let navigate=useNavigate()
  const [data,setData]=useState([]);
  useEffect(()=>{
    const name = localStorage.getItem('username');
    if (name === '' || name === null) {
      navigate('/');
    }
    else {
    setTimeout(()=>{
     loadItems();
    },1000)
  }
  },[])
  const logoutDashboard = () => {
    localStorage.removeItem('username');
    navigate('/');
  }
  const addCart=async(a,b,c)=>{
     
    let isExisting = false;
    const result = await axios.get('http://localhost:4000/Carts');
    if(result.data.length===0)
    {
        
        const order = {Img:a,Model:b,Price:c,Quantity:1}
    axios.post('http://localhost:4000/Carts',order).then(()=>loadItems());
    window.alert('Item Added to Cart');
    }
    else
    {
        result.data.map((cart)=>{
            if(b===cart.Model)
            { 
                cart.Quantity++;
                const order ={Img:a,Model:b,Price:c,Quantity:cart.Quantity}
           
            axios.put(`http://localhost:4000/Carts/${cart.id}`,order);
            isExisting = true;
        };

        })
        if(isExisting==false){
          const order ={Img:a,Model:b,Price:c,Quantity:1}
          axios.post('http://localhost:4000/Carts',order).then(()=>loadItems());
          window.alert('Item Added to Cart');
        }
    }
  }
  const loadItems=()=>{
    axios.get('http://localhost:4000/Favorites').then(res=>{
      setData(res.data)
      setIsLoading(false)});
  }
  const deleteFavorite=async(a)=>{
    
      {data.map(data=>{
        if(a===data.Model){
          axios.delete(`http://localhost:4000/Favorites/${data.id}`).then(()=>loadItems());
          window.alert('Removed from Favorites');
        }
      })}
    
  }
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });
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
    return(<>
     <ThemeProvider theme={theme}>
            <Box sx={{ display: { xs: 'inline-block', sm: 'block' } }}>
                <AppBar sx={{ flexGrow: 1 }}>
                    <Toolbar>
                        <ShoppingCartIcon sx={{ marginRight: '10px', fontSize: '30px',color:'black' }} />
                        <Typography variant='h5' sx={{ flexGrow: 1, color: 'black' }}>VIEW FAVORITES</Typography>
              <Button sx={{ color: 'inherit', display: { xs: 'inline-block', sm: 'inline-block' } }} class='login-button' onClick={()=>navigate('/Dashboard')}>BACK</Button>
              <Button sx={{ color: 'inherit', display: { xs: 'none', sm: 'inline-block' } }} class='login-button' onClick={() => logoutDashboard()}>LOGOUT</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
        {isLoading?
        <div>
        <Box sx={{marginTop:'70px',marginLeft:'400px'}}>
            
        <CartSkeleton/>
        <br></br>
        <CartSkeleton/>
        <br></br>
        <CartSkeleton/>
       <br></br>
        <CartSkeleton/>
        <br></br>
        <CartSkeleton/>
        <br></br>
        <CartSkeleton/>
        <br></br>
        <CartSkeleton/>
        <br></br>
        <CartSkeleton/>
        <br></br>
        <CartSkeleton/>
        <br></br>
        </Box>
        </div>
        :data.map(favorite=>{
          const imagePath = encodeURIComponent(favorite.Img);
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
            <Img alt="complex" src={favorite.Img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="h6" gutterBottom>
               {favorite.Model}
              </Typography>
              <Typography variant="h6" color="text.secondary">
              <CurrencyRupeeIcon sx={{ fontSize: '15px' }} />{favorite.Price}
              </Typography>
            </Grid>
                <Grid item >
                  <Button class='remove-button' onClick={()=>deleteFavorite(favorite.Model)}>
                <DeleteIcon sx={{fontSize:'15px',marginRight:'2px'}}/>REMOVE
              </Button>
                  <Button class='addcart-button' onClick={()=>addCart(favorite.Img,favorite.Model,favorite.Price)}>
              <AddShoppingCartIcon sx={{fontSize:'15px',marginRight:'2px'}}/>MOVE TO CART
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>)})}
    </>)
}
export default Favorites;