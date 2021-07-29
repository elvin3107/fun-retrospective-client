import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = ({ data, open, handleClose }) => {
    const severityType = ["error", "warning", "success", "info"];

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severityType[data.type]}>
                {data.message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;