import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
    return (
        <Grid item>
            <CircularProgress/>
        </Grid>
    );
};

export default Loading;