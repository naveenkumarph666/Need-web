import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import { Avatar, Badge, Box, Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Checkbox, Divider, Drawer, Grid, IconButton, InputBase, Link, List, ListItemButton, ListItemIcon, ListItemText, Stack, ThemeProvider, Toolbar, Tooltip, Typography, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import axios from "axios";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MuiDrawer from '@mui/material/Drawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCardIcon from '@mui/icons-material/AddCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import Switch from '@mui/material/Switch';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "./CardSkeleton";
import './style.css';
function Dashboard() {

    const [search, setSearch] = useState('')
    const [data, setData] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    useEffect(() => {

        const name = localStorage.getItem('username');
        if (name === '' || name === null) {
            navigate('/');
        }
        else {
            setTimeout(async () => {
                loadItems();
            }, 1000)
        }
    }, [])
    const loadItems = () => {
        axios.get('http://localhost:4000/Mobiles').then(res => {
            setData(res.data)
            setIsloading(false)
        })
    }
    const addFavorite = async (a, b, c) => {
        let isExisting = false;
        const result = await axios.get('http://localhost:4000/Favorites');
        if (result.data.length === 0) {
            const order = { Img: a, Model: b, Price: c };
            axios.post('http://localhost:4000/Favorites', order).then(() => loadItems());
            window.alert('Item Added to Favorite');
        }
        else {
            result.data.map((favorite) => {
                if (b === favorite.Model) {
                    isExisting = true;
                }
            })
            if (isExisting == false) {
                const order = { Img: a, Model: b, Price: c };
                axios.post('http://localhost:4000/Favorites', order).then(() => loadItems());
                window.alert('Item Added to Favorite');
            }
        }
    }
    const addCart = async (a, b, c) => {

        let isExisting = false;
        const result = await axios.get('http://localhost:4000/Carts');
        if (result.data.length === 0) {

            const order = { Img: a, Model: b, Price: c, Quantity: 1 }
            axios.post('http://localhost:4000/Carts', order).then(() => loadItems());
            window.alert('Item Added to Cart');
        }
        else {
            result.data.map((cart) => {
                if (b === cart.Model) {
                    cart.Quantity++;
                    const order = { Img: a, Model: b, Price: c, Quantity: cart.Quantity }

                    axios.put(`http://localhost:4000/Carts/${cart.id}`, order);
                    isExisting = true;
                };

            })
            if (isExisting == false) {
                const order = { Img: a, Model: b, Price: c, Quantity: 1 }
                axios.post('http://localhost:4000/Carts', order).then(() => loadItems());
                window.alert('Item Added to Cart');
            }
        }

    }
    const logoutDashboard = () => {
        localStorage.removeItem('username');
        navigate('/');
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    let navigate = useNavigate();
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const moveToMyprofile = () => {
        navigate('/myprofile');
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
                        <IconButton
                            size="large"
                            edge="start"
                            color='black'
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <ShoppingCartIcon sx={{ marginRight: '10px', display: { xs: 'none', sm: 'inline-block' }, color: 'black' }} />
                        <Typography variant='h5' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'inline-block' } }} color={"black"}>
                            DASHBOARD
                        </Typography>
                        <InputBase placeholder="Search For Items" sx={{ ml: 2, flex: 4, bgcolor: 'white', borderRadius: '5px', width: '200px', paddingLeft: '10px', color: 'CaptionText', display: { xs: 'inline-block', sm: 'inline-block' } }} onChange={(e) => setSearch(e.target.value)} value={search} />
                        <IconButton type="button" sx={{ p: '10px', display: { xs: 'none', sm: 'inline-block' }, marginRight: '100px' }} aria-label="search" color='black' >
                            <SearchIcon />
                        </IconButton>
                        <Badge badgeContent={4} sx={{ marginLeft: '10px', color: 'black' }}>
                            <NotificationsNoneIcon sx={{ color: 'black' }} />
                        </Badge>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open1 ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open1 ? 'true' : undefined}
                            >
                                <Avatar alt='' src='' sx={{ marginRight: '10px', width: 27, height: 27 }}></Avatar>
                            </IconButton>
                        </Tooltip>

                        <Button class='login-button' sx={{ display: { xs: 'none', sm: 'inline-block' } }} onClick={() => logoutDashboard()}>LOGOUT</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open1}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={moveToMyprofile}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </ThemeProvider>
        <Drawer variant='temporary' open={mobileOpen} sx={{ display: { xs: 'inline-block', sm: 'none' }, width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} >
            <List>
                <ListItemButton onClick={handleDrawerToggle} >
                    <ListItemIcon>
                        <ChevronRightIcon />
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' />
                </ListItemButton>
            </List>
            <Box sx={{ width: '25%', padding: '20px', display: { xs: 'block', sm: 'none' } }}>
                <List sx={{ marginBottom: '20px' }}>
                    <ListItemButton >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItemButton>
                    <ListItemButton onClick={moveToMyprofile}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary='My Profile' />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/viewcart')}>
                        <ListItemIcon>
                            <AddShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary='View Carts' />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/favorites')}>
                        <ListItemIcon>
                            <FavoriteBorderIcon />
                        </ListItemIcon>
                        <ListItemText primary='Favorites' />
                    </ListItemButton>
                    <ListItemButton href='/orders'>
                        <ListItemIcon>
                            <BusinessCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary='Your Orders' />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <Switch size="small" />
                        </ListItemIcon>
                        <ListItemText primary='Dark Mode' />
                    </ListItemButton>
                    <ListItemButton onClick={()=>logoutDashboard()}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
        <Stack direction="row" sx={{ marginTop: '60px' }}>
            <Box sx={{ width: '20%', padding: '20px', display: { xs: 'none', sm: 'inline-block' } }} className='dashboard-body1'>
                <Box sx={{ position: 'fixed' }}>
                    <Box >
                        <List sx={{ marginBottom: '20px' }} className='dashboard-icons'>
                            <ListItemButton >
                                <ListItemIcon>
                                    <HomeIcon className='dashboard-icons' />
                                </ListItemIcon>
                                <ListItemText primary='Home' />
                            </ListItemButton>
                            <ListItemButton onClick={moveToMyprofile}>
                                <ListItemIcon>
                                    <AccountCircleIcon className='dashboard-icons' />
                                </ListItemIcon>
                                <ListItemText primary='My Profile' />
                            </ListItemButton>
                            <ListItemButton href='/viewcart'>
                                <ListItemIcon>
                                    <AddShoppingCartIcon className='dashboard-icons' />
                                </ListItemIcon>
                                <ListItemText primary='View Carts' />
                            </ListItemButton>
                            <ListItemButton href='/favorites'>
                                <ListItemIcon>
                                    <FavoriteBorderIcon className='dashboard-icons' />
                                </ListItemIcon>
                                <ListItemText primary='Favorites' />
                            </ListItemButton>
                            <ListItemButton href='/orders'>
                                <ListItemIcon>
                                    <BusinessCenterIcon className='dashboard-icons' />
                                </ListItemIcon>
                                <ListItemText primary='Your Orders' />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Switch size="small" className='dashboard-icons' />
                                </ListItemIcon>
                                <ListItemText primary='Dark Mode' />
                            </ListItemButton>
                            <ListItemButton onClick={()=>logoutDashboard()}>
                                <ListItemIcon>
                                    <LogoutIcon className='dashboard-icons' />
                                </ListItemIcon>
                                <ListItemText primary='Logout' />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Box>

            <Box className='dashboard-body2' sx={{ width: '100%', height: '100%', padding: '10px' }}>

                {isLoading ? <div>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Box sx={{ marginTop: '10px' }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                            </Grid>
                        </Box>
                    </Grid>
                </div>
                    : data.filter(data => data.Model.toLowerCase().includes(search.toLowerCase())).map(data => {
                        const imagePath = encodeURIComponent(data.Img);
                        return (

                            <Card sx={{
                                maxWidth: 300
                            }} className="dashboard-card">

                                <CardMedia sx={{ height: 220 }} image={data.Img} title="VIVO" />
                                <ButtonBase onClick={() => navigate(`/viewmore/${imagePath}/${data.Model}/${data.Price}/${data.RAM}/${data.ROM}/${data.Camera}/${data.Processor}/${data.Ratings}/${data.id}/${data.description}`)}>
                                    <CardContent className='card-content'>
                                        <Typography gutterBottom variant="h5" component="div" >{data.Model}</Typography>
                                        <Typography gutterBottom variant="h6" component="div"><CurrencyRupeeIcon sx={{ fontSize: '15px' }} />{data.Price}</Typography>
                                        <Typography variant="body2" >{data.description}<Link sx={{ textDecoration: 'none' }}>More</Link></Typography>
                                    </CardContent>
                                </ButtonBase>
                                <CardActions className='dashboard-buttons'>
                                    <Button size="small" variant="contained" class='addfav-button' onClick={() => addFavorite(data.Img, data.Model, data.Price)}>ADD TO FAVORITE</Button>
                                    <Button size="small" variant="contained" class='addcart-button' onClick={() => addCart(data.Img, data.Model, data.Price)}>ADD TO CART</Button>
                                </CardActions>
                            </Card>

                        )
                    })}
            </Box>
        </Stack>
    </>)
}
export default Dashboard;
