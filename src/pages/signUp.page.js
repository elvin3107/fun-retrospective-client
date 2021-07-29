import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import userApi from '../api/userApi';

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
    marginTop: theme.spacing(3),
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
}));

const SignUpPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState(null);
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
   });
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userApi.register(detail);
      if(response.result) {
        const currentToken = localStorage.getItem('token');
        if(currentToken) localStorage.removeItem('token');
        setRedirect(true);
      } else {
        setMessage(response.message);
      }
    } catch(err) {
      setMessage(err);
    }
  };

  return (
    <div>
    {redirect === true ? (<Redirect to="/"/>) :
      (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            {
              message ? (
                  <Alert severity="error">
                    {message}
                  </Alert>
              ) : (<div></div>)
            }
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  onChange={(e) => setDetail({...detail, name: e.target.value})}
                  value={detail.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setDetail({...detail, email: e.target.value})}
                  value={detail.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setDetail({...detail, password: e.target.value})}
                  value={detail.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link to="/" className={classes.link}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>)}
    </div>
  );
};

export default SignUpPage;