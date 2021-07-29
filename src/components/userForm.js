import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import userApi from '../api/userApi';
import moment from 'moment';
import Notification from './notification';
import Loading from './loading';
import { InsertChartOutlinedSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
    }
}));

const UserForm = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState({name: "", date: 0, email: "", accessType: ""});
    const [changePassword, setChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [notification, setNotification] = useState({message: "", type: 0});
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const date = moment(profile.date).format("Do MMM yyyy");

    // Handle change password
    const handleClickChangePassword = () => {
        setOldPassword("");
        setNewPassword("");
        setChangePassword(true);
    };

    const handleChangePassword = async () => {
        try {
            const response = await userApi.changePassword({
                email: profile.email,
                oldPassword: oldPassword,
                newPassword: newPassword
            });
            if(response.result) {
                handleOpen("Change password success", 2);
            } else {
                handleOpen(response.message, 0);
            }
            setChangePassword(false);
        } catch(err) {
            console.log("Fail to change user password: ", err);
        }
    }

    // Handle update name
    const handleChangeName = async () => {
        try {
            const response = await userApi.updateUser(userId, {
                name: profile.name
            });
            if(response.result) {
                handleOpen("Update name success", 2);
            } else {
                handleOpen("Update name fail", 0);
            }
        } catch(err) {
            console.log("Fail to change user name: ", err);
        }
    }

    // Handle open notification
    const handleOpen = (message, type) => {
        setNotification({message: message, type: type});
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await userApi.getUser(userId);
                setProfile(response);
                setIsLoading(false);
            } catch(err) {
                console.log('Fail to fetch user profile: ', err);
            }
        }

        fetchUserProfile();
    }, []);

    if(isLoading) {
        return (
            <Grid container alignItems='center' direction="column" justify="center">
                <Loading/>
            </Grid>
        );
    }

    return ( 
        <Grid container justify="center">
            <Grid item xs={12} xl={6} >
                <Paper className={classes.paper}>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12}>
                            <Typography variant="h3" align="center" gutterBottom>
                                User Profile
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                required
                                id="Name"
                                name="Name"
                                label="Name"
                                fullWidth
                                autoComplete="given-name"
                                onChange={(e) => setProfile({...profile, name: e.target.value})}
                                value={profile.name}
                            />
                        </Grid>
                        {profile.accessType === "email" ? <Grid item xs={8}>
                            { !changePassword ? (
                                <Button color="primary"  onClick={handleClickChangePassword}>
                                    Change password
                                </Button>) : (
                                    <Grid container spacing={2} justify="center">
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="oldPassword"
                                                name="Old password"
                                                label="Old password"
                                                type="password"
                                                fullWidth 
                                                autoComplete="given-name"
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                value={oldPassword}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="newPassword"
                                                name="New password"
                                                label="New password"
                                                type="password"
                                                fullWidth
                                                autoComplete="given-name"
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                value={newPassword}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="primary"
                                                    onClick={handleChangePassword}>
                                                Confirm
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )
                            }   
                        </Grid> : <></>}
                        <Grid item xs={8}>
                            <Typography variant="h6">
                                Email
                            </Typography>
                            <Typography variant="h5">
                                {profile.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h6">
                                Registered 
                            </Typography>
                            <Typography variant="h5">
                                {date}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Button variant="contained" color="primary" fullWidth 
                                    onClick={handleChangeName}>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                    <Notification data={notification} open={open} handleClose={handleClose}/>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UserForm;