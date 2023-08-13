import { AppBar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Paper, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useState } from "react";
import MemoryIcon from '@mui/icons-material/Memory';
import CardCover from '@mui/joy/CardCover';
import StorageIcon from '@mui/icons-material/Storage';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SellIcon from '@mui/icons-material/Sell';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import CameraIcon from '@mui/icons-material/Camera';
import { useNavigate, useParams } from "react-router-dom";
import StarsIcon from '@mui/icons-material/Stars';
const ViewMore = () => {
    let navigate = useNavigate();
    const [num,setNum]=useState(Number('3'))
    const { imagePath, Model, Price, RAM, ROM, Camera, Processor,rating, id, description } = useParams();
    useEffect(()=>{
        const name = localStorage.getItem('username');
        if (name === '' || name === null) {
            navigate('/');
        }
    },[])
    const logoutDashboard = () => {
        localStorage.removeItem('username');
        navigate('/');
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
                        <ShoppingCartIcon sx={{ marginRight: '10px', fontSize: '30px',color:'black'}} />
                        <Typography variant='h5' sx={{ flexGrow: 1, color: 'black' }}>VIEW PAGE</Typography>
                        <Button sx={{ color: 'black', display: { xs: 'inline-block', sm: 'inline-block' } }} class='login-button' onClick={()=>navigate('/Dashboard')}>BACK</Button>
                        <Button sx={{ color: 'black', display: { xs: 'none', sm: 'inline-block' } }} class='login-button' onClick={() => logoutDashboard()}>LOGOUT</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
        <Box sx={{ marginTop: '70px', marginLeft: '230px', display: { xs: 'none', sm: 'block' }, textAlign: 'center' ,marginBottom:'20px'}}>
            <Card sx={{
                maxWidth: 800, 
                    boxShadow: 10, // theme.shadows[20]
                
            }}>
                <CardHeader action={<IconButton aria-label="My Profile">
                    <MoreVertIcon sx={{color:"black"}}/>
                </IconButton>} title='VIEW PAGE' sx={{ backgroundColor:'#cadfdf',color:'black'}} />
                <CardMedia sx={{ height: 450 }} title='View Page' image={imagePath} />
                <CardContent sx={{ padding: '10px' }}>
                    <Paper sx={{
                        marginTop: '20px', 
                            boxShadow: 2 // theme.shadows[20]
                        , backgroundColor:'#cadfdf'
                    }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 8 }}>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }} ><StayCurrentPortraitIcon /> Model:<strong>{Model}</strong></Typography></Grid>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }}><SellIcon />Price:<CurrencyRupeeIcon sx={{ fontSize: '20px' }} /><strong>{Price}</strong></Typography></Grid>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }}><MemoryIcon />RAM: <strong>{RAM}</strong></Typography></Grid>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }}><StorageIcon />ROM: <strong>{ROM}</strong></Typography></Grid>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }}><CameraIcon />Camera: <strong>{Camera}</strong></Typography></Grid>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }}><DeveloperBoardIcon />Processor: <strong>{Processor}</strong></Typography></Grid>
                            
                        </Grid> 
                    </Paper>
                    <Paper sx={{ margin: '10px', backgroundColor:'#cadfdf'}}>
                    <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor:'#cadfdf'}}>
                            <strong>Description:</strong>
                            </AccordionSummary>
                            <AccordionDetails>
                            <p>{description}</p></AccordionDetails>
                            </Accordion> 
                        <StarsIcon /><Typography variant='h5'>Rating:</Typography><Rating value={num} readOnly></Rating>
                    </Paper>
                </CardContent>
                <CardActions className='profile-actions'>
                    <Button size='small' class='addfav-button'>Add to Favorite</Button>
                    <Button size='small' class='addcart-button'>Add to Cart</Button>
                </CardActions>
            </Card>
        </Box>
        <Box sx={{ marginTop: '70px', marginLeft: '30px', display: { xs: 'block', sm: 'none' }, marginBottom: '20px' }}>
            <Card sx={{
                maxWidth: 300, 
                    boxShadow: 10, // theme.shadows[20]
                
            }}>
                <CardHeader action={<IconButton aria-label="Settings">
                    <MoreVertIcon sx={{color:'black'}}/>
                </IconButton>} title='VIEW PAGE' sx={{ textAlign: 'center', backgroundColor:'#cadfdf',marginBottom:'10px',color:'black'}} />
                <CardMedia sx={{ height: 250 }} title='View Page' image={imagePath} />
                <CardContent>
                <Paper sx={{
                        marginTop: '20px', 
                            boxShadow: 2, // theme.shadows[20]
                        backgroundColor: '#cadfdf'
                    }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 8 }}>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }} ><StayCurrentPortraitIcon /> Model:<strong>{Model}</strong></Typography></Grid>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }}><SellIcon />Price:<CurrencyRupeeIcon sx={{ fontSize: '20px' }} /><strong>{Price}</strong></Typography></Grid>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }}><MemoryIcon />RAM: <strong>{RAM}</strong></Typography></Grid>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }}><StorageIcon />ROM: <strong>{ROM}</strong></Typography></Grid>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }}><CameraIcon />Camera: <strong>{Camera}</strong></Typography></Grid>
                            <Grid item xs={2} sm={2} md={4}><Typography variant="h5" sx={{ padding: '10px' }}><DeveloperBoardIcon />Processor: <strong>{Processor}</strong></Typography></Grid>
                            
                        </Grid> 
                    </Paper>
                    <Paper sx={{ backgroundColor: '#cadfdf' }}>
                            <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#cadfdf' }}>
                            <strong>Description:</strong>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>{description}</p></AccordionDetails>
                            </Accordion> 
                        <Typography variant='h5'><StarsIcon />Rating:</Typography><Rating value={num} readOnly></Rating>
                    </Paper>
                </CardContent>
                <CardActions className='profile-actions'>
                    <Button size="small" class='addfav-button'>Add to Favorite</Button>
                    <Button size="small" class='addcart-button'>Add to Cart</Button>
                </CardActions>
            </Card>
        </Box>
    </>)
}
export default ViewMore;
