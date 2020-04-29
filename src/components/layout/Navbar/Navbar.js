import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    makeStyles,
    Button,
    SwipeableDrawer,
    ButtonGroup,
    useTheme,
    useMediaQuery,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import NavList from './NavList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    drawerPaper: {
        width: 250,
        overflow: 'auto',
        height: '100%',
        [theme.breakpoints.up('md')]: {
            overflow: 'auto',
            position: 'relative',
            height: '100%',
        },
    },
}));

function Navbar({ authenticated, logout }) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    {matches && (
                        <IconButton
                            onClick={handleOpen}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography variant="h6" className={classes.title}>
                        Chattup
                    </Typography>
                    {!authenticated ? (
                        <ButtonGroup>
                            <Link to="/login" className={classes.link}>
                                <Button color="inherit">Login</Button>
                            </Link>
                            <Link to="/register" className={classes.link}>
                                <Button color="inherit">Register</Button>
                            </Link>
                        </ButtonGroup>
                    ) : (
                        <Button onClick={handleLogout} color="inherit">
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                className={classes.drawer}
                style={{ minWidth: 150 }}
                anchor="left"
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
            >
                <NavList />
            </SwipeableDrawer>
        </>
    );
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
