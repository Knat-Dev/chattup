import React, { useRef, useEffect } from 'react';
import {
    Container,
    makeStyles,
    Grid,
    Box,
    useTheme,
    useMediaQuery,
    Paper,
} from '@material-ui/core';
import NavList from '../layout/Navbar/NavList';
import { Scrollbars } from 'react-custom-scrollbars';
import Message from '../Chat/Message';

const useStyles = makeStyles((theme) => ({
    sideBar: {
        height: 'calc(100vh - 63.99px)',
        background: '#424242',
        [theme.breakpoints.down('xs')]: {
            height: 'calc(100vh - 55.99px)',
        },
        overflow: 'scroll',
    },
    chat: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: 'calc(90vh - 63.99px)',
        background: '#262626',
        overflowY: 'auto',
        overflowX: 'hidden',
        [theme.breakpoints.down('xs')]: {
            height: 'calc(90vh - 55.99px)',
        },
    },
}));

export default function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const messagesEndRef = useRef(null); // Scroll to bottom

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView();
    };

    useEffect(scrollToBottom, []);

    return (
        <>
            <Grid>
                <Box display="flex">
                    {!matches && (
                        <Paper
                            square
                            className={classes.sideBar}
                            style={{
                                minWidth: 300,
                                overflow: 'auto',
                            }}
                        >
                            <NavList />
                        </Paper>
                    )}
                    <Box
                        height="100%"
                        width="100%"
                        className={classes.chatRoom}
                    >
                        <div className={classes.chat}>
                            <Message />
                            <div ref={messagesEndRef} />
                        </div>
                    </Box>
                </Box>
            </Grid>
        </>
    );
}
