import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const CheckLoginLoading = () => {
    return (
        <Grid container justify="center" 
            spacing={5}
            direction="column"
            alignItems="center"
            justify="center">
            <Grid item >
                <Typography variant="h2" >
                    Check Login
                </Typography>
            </Grid>
            <Grid item >
                <CircularProgress/>
            </Grid>
            
        </Grid>
    );
};

export default CheckLoginLoading;