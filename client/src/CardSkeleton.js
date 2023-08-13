import { Card, CardActions, CardContent, CardMedia, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
const CardSkeleton=()=>{
    return(<>
    
        <Grid item xs={4} sm={4} md={4} sx={{marginTop:'10px'}}>
           <Card sx={{maxWidth:345}}>
              <CardMedia/><Skeleton variant="rectangular" width={345} height={140} animation="wave"/>
              <CardContent><Typography variant="h5"><Skeleton variant="text" animation="wave" width={150}/></Typography></CardContent>
              <Typography paragraph><Skeleton variant="rectangular" width={300} height={140} animation="wave"/></Typography>
              <CardActions><Skeleton variant="text" animation="wave" width={300} height={50}/></CardActions>
           </Card>
        </Grid>
    
    </>)
}
export default CardSkeleton;