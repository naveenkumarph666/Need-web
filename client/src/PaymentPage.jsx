import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import react, { useEffect, useState } from 'react';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';
const PaymentPage = () => {
   const [data, setData] = useState([])
   const ORDERS_URL = 'http://localhost:4000/Orders';
   const CARTS_URL = 'http://localhost:4000/Carts';
   let navigate = useNavigate();

   useEffect(() => {
      axios.get(CARTS_URL).then(res => setData(res.data));
   }, []);

   const deleteItem = async (a) => {
      await axios.delete(CARTS_URL + '/' + a);
   }

   const sendOrder = async () => {
      try {
         for (let i = 0; i < data.length; i++)
          {
            const item = data[i];
           const postResp = await axios.post(ORDERS_URL, item);
           const deleteResp = await axios.delete(CARTS_URL +'/'+item.id) 
         }
         await navigate('/');
      } catch (error) {
         console.log('error::::::::::::::::::\n', error);
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
         <Box sx={{ display: { xs: 'inline-block', sm: 'block' } }}>
            <AppBar sx={{ flexGrow: 1 }}>
               <Toolbar>
                  <PaymentIcon sx={{ marginRight: '10px', fontSize: '30px',color:'black' }} />
                  <Typography variant='h5' color='black' sx={{ flexGrow: 1 }}>
                     PAYMENT SETTLE
                  </Typography>
                  <Button sx={{ color: 'inherit', display: { xs: 'inline-block', sm: 'inline-block' } }} class='login-button' onClick={()=>navigate('/')}>BACK</Button>
                  <Button sx={{ color: 'inherit', display: { xs: 'none', sm: 'inline-block' } }} class='login-button'>LOGOUT</Button>
               </Toolbar>
            </AppBar>
         </Box>
      </ThemeProvider>

      <Box sx={{ marginTop: '70px', marginLeft: '250px', display: { xs: 'none', sm: 'block' } }}>
         <Card sx={{
            maxWidth: 800,
            boxShadow: 5, // theme.shadows[20]
         }}>
            <CardHeader action={<IconButton aria-label="Payment Settle">
               <MoreVertIcon sx={{ color: "black" }} />
            </IconButton>} title='PAYMENT SETTLE' sx={{ textAlign: 'center', backgroundColor: '#cadfdf', marginBottom: '10px', color: 'black' }} />

            <CardContent sx={{ marginLeft: '10px' }}>


               <FormControl>
                  <FormLabel id="demo-customized-radios"> Card Payment</FormLabel>
                  <RadioGroup
                     defaultValue="Debit Card"
                     aria-labelledby="demo-customized-radios"
                     name="customized-radios"
                     row
                  >
                     <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                           <FormControlLabel value="Debit Card" control={<Radio />} label="Debit Card" />
                           <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
                        </AccordionSummary>
                        <AccordionDetails>
                           <TextField label='Card Number' name='Card Number' variant='outlined' placeholder='XXXX XXXX XXXX X000' sx={{ margin: '10px' }} /><br></br>
                           <TextField label='CVV No.' name='CVV No.' variant='outlined' size='small' placeholder='XXX' sx={{ margin: '10px', width: '100px' }} />
                           <TextField label='Expiry Date' name='Expiry Date' variant='outlined' size='small' placeholder='YY/MM' sx={{ margin: '10px', width: '80px' }} />
                        </AccordionDetails>
                     </Accordion>
                  </RadioGroup>
               </FormControl>
               <FormControl sx={{ marginTop: '20px' }}>
                  <FormLabel id="demo-customized-radios" > UPI Payment</FormLabel>
                  <RadioGroup
                     defaultValue="PhonePe"
                     aria-labelledby="demo-customized-radios"
                     name="customized-radios"
                     row
                  >
                     <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ paddingRight: '20px' }}>
                           <img src='data:image/png;base64,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' style={{ width: '30px', height: '30px', marginTop: '10px', marginRight: '10px' }} /><FormControlLabel value="PhonePe" control={<Radio />} label='PhonePe' /><Divider orientation="vertical" variant="middle" flexItem sx={{ color: 'black', marginRight: '10px' }} />
                           <img src='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png' style={{ width: '30px', height: '30px', marginRight: '10px', marginTop: '10px' }} /><FormControlLabel value="GooglePay" control={<Radio />} label='GooglePay' /><Divider orientation="vertical" variant="middle" flexItem sx={{ marginRight: '10px' }} />
                           <img src='https://static.vecteezy.com/system/resources/previews/019/040/328/original/paytm-logo-icon-free-vector.jpg' style={{ width: '35px', height: '35px', marginRight: '10px', marginTop: '10px' }} /><FormControlLabel value="Paytm" control={<Radio />} label='Paytm' /><Divider orientation="vertical" variant="middle" flexItem sx={{ marginRight: '10px' }} />
                           <img src='data:image/png;base64,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' style={{ width: '30px', height: '30px', marginRight: '10px', marginTop: '10px' }} /><FormControlLabel value="BHIM" control={<Radio />} label='BHIM' />
                        </AccordionSummary>
                        <AccordionDetails>
                           <TextField label='Mobile Number' name='Mobile Number' variant='outlined' placeholder='XXXXXXXX00' sx={{ margin: '10px' }} />
                        </AccordionDetails>
                     </Accordion>
                  </RadioGroup>
               </FormControl>
               <FormControl sx={{ marginTop: '20px' }}>
                  <FormLabel id="demo-customized-radios" >
                     Address
                  </FormLabel>
                  <RadioGroup
                     defaultValue="Residence"
                     aria-labelledby="demo-customized-radios"
                     name="customized-radios"
                     row
                  >
                     <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                           <FormControlLabel value="Residence" control={<Radio />} label="Residence" />
                           <FormControlLabel value="Office" control={<Radio />} label="Office" />
                        </AccordionSummary>
                        <AccordionDetails>
                           <TextField label='Address 1' name='Address 1' variant='outlined' placeholder='Address Line 1' sx={{ margin: '10px' }} /><br></br>
                           <TextField label='Address 2' name='Address 2' variant='outlined' placeholder='Address Line 2' sx={{ margin: '10px' }} /><br></br>
                           <TextField label='Street Name' name='Street Name' variant='outlined' size='small' placeholder='Street Name' sx={{ margin: '10px', width: '100px' }} />
                           <TextField label='PinCode' name='PinCode' variant='outlined' size='small' placeholder='PinCode' sx={{ margin: '10px', width: '80px' }} />
                        </AccordionDetails>
                     </Accordion>
                  </RadioGroup>
               </FormControl>
            </CardContent>
         </Card>
         <Box className='place-button' sx={{ marginLeft: '330px', display: { xs: 'none', sm: 'block' } }}><Button class='place-order' onClick={()=>sendOrder()}>PLACE ORDER</Button></Box>
      </Box>
      <Box sx={{ marginTop: '70px', marginLeft: '30px', display: { xs: 'block', sm: 'none' } }}>
         <Card sx={{
            maxWidth: 350,
            boxShadow: 5, // theme.shadows[20]
         }}>
            <CardHeader action={<IconButton aria-label="Payment Settle">
               <MoreVertIcon sx={{ color: "black" }} />
            </IconButton>} title='PAYMENT SETTLE' sx={{ textAlign: 'center', backgroundColor: '#cadfdf', marginBottom: '10px', color: 'black' }} />

            <CardContent sx={{ marginLeft: '10px' }}>


               <FormControl>
                  <FormLabel id="demo-customized-radios"> Card Payment</FormLabel>
                  <RadioGroup
                     defaultValue="Debit Card"
                     aria-labelledby="demo-customized-radios"
                     name="customized-radios"
                     row
                  >
                     <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                           <FormControlLabel value="Debit Card" control={<Radio />} label="Debit Card" />
                           <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
                        </AccordionSummary>
                        <AccordionDetails>
                           <TextField label='Card Number' name='Card Number' variant='outlined' placeholder='XXXX XXXX XXXX X000' sx={{ margin: '10px' }} /><br></br>
                           <TextField label='CVV No.' name='CVV No.' variant='outlined' size='small' placeholder='XXX' sx={{ margin: '10px', width: '100px' }} />
                           <TextField label='Expiry Date' name='Expiry Date' variant='outlined' size='small' placeholder='YY/MM' sx={{ margin: '10px', width: '80px' }} />
                        </AccordionDetails>
                     </Accordion>
                  </RadioGroup>
               </FormControl>
               <FormControl sx={{ marginTop: '20px' }}>
                  <FormLabel id="demo-customized-radios" > UPI Payment</FormLabel>
                  <RadioGroup
                     defaultValue="PhonePe"
                     aria-labelledby="demo-customized-radios"
                     name="customized-radios"
                  >
                     <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ paddingRight: '20px' }}>
                           <img src='data:image/png;base64,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' style={{ width: '30px', height: '30px', marginTop: '10px', marginRight: '10px' }} /><FormControlLabel value="PhonePe" control={<Radio />} label='PhonePe' /><Divider orientation="vertical" variant="middle" flexItem sx={{ color: 'black', marginRight: '10px' }} />
                           <img src='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png' style={{ width: '30px', height: '30px', marginRight: '10px', marginTop: '10px' }} /><FormControlLabel value="GooglePay" control={<Radio />} label='GooglePay' /><Divider orientation="vertical" variant="middle" flexItem sx={{ marginRight: '10px' }} />
                           <img src='https://static.vecteezy.com/system/resources/previews/019/040/328/original/paytm-logo-icon-free-vector.jpg' style={{ width: '35px', height: '35px', marginRight: '10px', marginTop: '10px' }} /><FormControlLabel value="Paytm" control={<Radio />} label='Paytm' /><Divider orientation="vertical" variant="middle" flexItem sx={{ marginRight: '10px' }} />
                           <img src='data:image/png;base64,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' style={{ width: '30px', height: '30px', marginRight: '10px', marginTop: '10px' }} /><FormControlLabel value="BHIM" control={<Radio />} label='BHIM' />
                        </AccordionSummary>
                        <AccordionDetails>
                           <TextField label='Mobile Number' name='Mobile Number' variant='outlined' placeholder='XXXXXXXX00' sx={{ margin: '10px' }} />
                        </AccordionDetails>
                     </Accordion>
                  </RadioGroup>
               </FormControl>
               <FormControl sx={{ marginTop: '20px' }}>
                  <FormLabel id="demo-customized-radios" >
                     Address
                  </FormLabel>
                  <RadioGroup
                     defaultValue="Residence"
                     aria-labelledby="demo-customized-radios"
                     name="customized-radios"
                     row
                  >
                     <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                           <FormControlLabel value="Residence" control={<Radio />} label="Residence" />
                           <FormControlLabel value="Office" control={<Radio />} label="Office" />
                        </AccordionSummary>
                        <AccordionDetails>
                           <TextField label='Address 1' name='Address 1' variant='outlined' placeholder='Address Line 1' sx={{ margin: '10px' }} /><br></br>
                           <TextField label='Address 2' name='Address 2' variant='outlined' placeholder='Address Line 2' sx={{ margin: '10px' }} /><br></br>
                           <TextField label='Street Name' name='Street Name' variant='outlined' size='small' placeholder='Street Name' sx={{ margin: '10px', width: '100px' }} />
                           <TextField label='PinCode' name='PinCode' variant='outlined' size='small' placeholder='PinCode' sx={{ margin: '10px', width: '80px' }} />
                        </AccordionDetails>
                     </Accordion>
                  </RadioGroup>
               </FormControl>
            </CardContent>
         </Card>
         <Box className='place-button' sx={{ marginLeft: '120px', display: { xs: 'block', sm: 'none' } }}><Button class='place-order' onClick={() => sendOrder()}>PLACE ORDER</Button></Box>
      </Box>
   </>)
}
export default PaymentPage;