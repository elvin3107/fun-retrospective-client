import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import BoardList from '../components/boardList';
import Header from '../components/header';
import SignInPage from './signIn.page';
import UserForm from '../components/userForm'
import userApi from '../api/userApi';
import authApi from '../api/authApi';
import { Route, Switch } from 'react-router-dom';
import BoardDetail from '../components/boardDetail';
import { useGoogleLogout } from 'react-google-login';
import CheckLoginLoading from '../components/checkLoginLoading';

const HomePage = ({ match }) => {
    const [isLoginLoading, setIsLoginLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT,
        onLogoutSuccess: () => {console.log("logout success")},
        onFailure: () => {console.log("logout fail")}
    });

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await userApi.checkLogin();
                if(response.user) setUser(response.user);
            } catch(err) {
                console.log('Fail to get user: ', err);
            }
            setIsLoginLoading(false);
        }

        checkLogin();
    }, []);

    // Email
    const Login = async (detail) => {
        try {
            setIsLoading(true);
            const response = await userApi.login(detail);
            if(response.result) {
                localStorage.setItem('token', response.token);
                setUser(response.user);
                setIsLoading(false);
            } else {
                setMessage(response.message);
            }
        } catch(err) {
            console.log('Fail to login: ', err);
        }
    };

    const Logout = () => {
        if(user.type === "google") signOut();
        setUser(null);
        setMessage(null);
        const currentToken = localStorage.getItem('token');
        if(currentToken) localStorage.removeItem('token');
    };

    // Google 
    const googleLogin = async (res) => {
        try {
            setIsLoading(true);
            const response = await authApi.googleLogin(res.tokenId);
            if(response.result) {
                localStorage.setItem('token', response.token);
                setUser(response.user);
                setIsLoading(false);
            } else {
                setMessage(response.message);
            }
        } catch(err) {
            setIsLoading(false);
            console.log("Fail to login with google: ", err);
        }
    };

    // Facebook
    const facebookLogin = async (res) => {
        try {
            setIsLoading(true);
            const response = await authApi.facebookLogin({
                accessToken: res.accessToken,
                userID: res.userID
            });
            if(response.result) {
                localStorage.setItem('token', response.token);
                setUser(response.user);
                setIsLoading(false);
            } else {
                setMessage(response.message);
            }
        } catch(err) {
            setIsLoading(false);
            console.log("Fail to login with facebook: ", err);
        }
    };

    if(isLoginLoading) {
        return (
            <CheckLoginLoading></CheckLoginLoading>
        );
    }

    if(!user) {
        return (
            <SignInPage action={Login} googleAction={googleLogin} facebookAction={facebookLogin} message={message} loading={isLoading} />
        );
    }

    return (
        <Grid container direction="column">
            <Grid item>
                <Header user={user} action={Logout} url={match.url}/>
            </Grid>
            <Grid item container>
                <Grid item xs={1} sm={2}/>
                <Grid item xs={10} sm={8}>
                    <Switch>
                        <Route exact path={`/profile`} render={props => <UserForm {...props} userId={user.id}/>} />
                        <Route exact path={'/:boardId'} render={props => <BoardDetail userId={user.id} />} />
                        {/* <Route path={'/'} render={props => <BoardList {...props} userId={user.id}/>} />*/}
                        <Route path={'/'} component={() => <BoardList userId={user.id}/>} />
                    </Switch>
                </Grid>
                <Grid item xs={1} sm={2}/>
            </Grid>
        </Grid>
    );
};

export default HomePage;