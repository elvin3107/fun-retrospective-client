import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField, LinearProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  google_button: {
    margin: theme.spacing(3, 0, 2),
    width: '100%'
  },
  facebook_button: {
    margin: theme.spacing(3, 0, 2),
    width: '100%'
  }
}));

const SignInPage = ({ action, message, googleAction, facebookAction, loading }) => {
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    action(detail);
  };

  const responseGoogle = (res) => {
    googleAction(res);
  }

  const responseFacebook = (res) => {
    facebookAction(res);
  }

  return (
    <Container component="main" maxWidth="xs">
      {loading ? <LinearProgress></LinearProgress> : <></>}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {
            message ? (
                <Alert severity="error">
                  {message}
                </Alert>
            ) : (<div></div>)
          }
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setDetail({...detail, email: e.target.value})}
            value={detail.name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setDetail({...detail, password: e.target.value})}
            value={detail.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <Link to='/sign-up' className={classes.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid >
            <Grid container justify="center" alignItems="center">
              <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT}
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className={classes.google_button}
              />
            </Grid>
            <Grid container justify="center" alignItems="center">
              <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_ID}
              autoLoad={false}
              fields="name,email"
              callback={responseFacebook} 
              icon="fa-facebook"
              className={classes.facebook_button}
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignInPage;