import { Card, CardActions, CardContent, CardMedia, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
const CartSkeleton=()=>{
    return(<>
    
            <Grid item xs container direction="column" spacing={2}>
              
              <Card sx={{maxWidth:500}}>
              <CardMedia/><Skeleton variant="rectangular" width={128} height={128} animation="wave"/>
           
              <CardActions sx={{marginLeft:'100px',marginRight:'100px'}}><Skeleton variant="text" animation="wave" width={300} height={50}/></CardActions>
           </Card>
           
           </Grid>
           
    </>)
}
export default CartSkeleton;