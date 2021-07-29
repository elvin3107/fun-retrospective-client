import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './pages/home.page';
import SignUpPage from './pages/signUp.page';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/sign-up' exact component={SignUpPage} />
                <Route path='/' component={HomePage} />
            </Switch>
        </Router>
    );
};

export default App;