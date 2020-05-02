import React, { useEffect } from 'react';
import './App.css';
import { Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Navbar from './components/layout/Navbar/Navbar';
import Register from './components/pages/Register';
import {
    createMuiTheme,
    ThemeProvider,
    CssBaseline,
    makeStyles,
} from '@material-ui/core';
import PrivateRoute from './components/util/PrivateRoute';
import PublicRoute from './components/util/PublicRoute';
import { deepPurple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: deepPurple[400],
            contrastText: '#fff',
        },
    },
    overrides: {
        MuiFilledInput: {
            input: {
                '&:-webkit-autofill': {
                    transitionDelay: '9999s',
                    transitionProperty: 'background-color, color',
                    WebkitBoxShadow: '0 0 0 1000px #434343 inset !important',
                },
            },
        },
    },
});

const useStyles = makeStyles({
    flex: {
        height: '100vh',
        width: '100vw',
    },
    grow: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
});

export const history = createBrowserHistory();

function App() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
                <div className={classes.flex}>
                    <Navbar />
                    <div className={classes.grow}>
                        <Switch>
                            <PrivateRoute exact path="/" component={Home} />
                            <PublicRoute path="/login" component={Login} />
                            <PublicRoute
                                path="/register"
                                component={Register}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
