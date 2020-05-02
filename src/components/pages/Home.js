import React, { useRef, useEffect, useState } from 'react';
import {
    Container,
    makeStyles,
    Grid,
    Box,
    useTheme,
    useMediaQuery,
    Paper,
    Typography,
    CircularProgress,
    FormControl,
    TextField,
    InputAdornment,
    IconButton,
} from '@material-ui/core';
import NavList from '../layout/Navbar/NavList';
import { Scrollbars } from 'react-custom-scrollbars';
import Message from '../Chat/Message';
import ChatTitle from '../Chat/ChatTitle';
import { connect } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import Messages from '../Chat/Messages';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { postMessageToChannel } from '../../redux/actions/messages';
import PostMessageForm from '../Chat/PostMessageForm';
import { usePageVisibility } from 'react-page-visibility';
import { database } from '../../firebase';

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
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: 'calc(85vh - 63.99px)',
        background: '#262626',
        overflow: 'auto',
        [theme.breakpoints.down('xs')]: {
            height: 'calc(80vh - 55.99px)',
        },
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
    },
    input: {
        height: 'calc(15vh - 64px)',
        [theme.breakpoints.down('xs')]: {
            height: 'calc(20vh - 64px)',
        },
    },
}));

function Home({
    channel,
    user: { displayName, photoURL },
    postMessageToChannel,
}) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const messagesEndRef = useRef(null); // Scroll to bottom
    const isVisible = usePageVisibility();

    useEffect(() => {
        const statusRef = database.ref(`status/${displayName}`);
        if (!isVisible)
            statusRef.set({
                last_changed: new Date().toISOString(),
                state: 'away',
            });
        else
            statusRef.set({
                last_changed: new Date().toISOString(),
                state: 'online',
            });
    }, [isVisible]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, []);

    const onSuccess = () => {
        scrollToBottom();
    };

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
                        <div className={classes.title}>
                            <Typography variant="h5">
                                {channel.channelName ? (
                                    channel.channelName
                                ) : (
                                    <Skeleton
                                        variant="text"
                                        width={250}
                                        animation="wave"
                                    />
                                )}
                            </Typography>
                        </div>
                        <div className={classes.chat}>
                            <Messages onSuccess={onSuccess} />
                            <div ref={messagesEndRef} />
                        </div>
                        <div className={classes.input}>
                            <PostMessageForm />
                        </div>
                    </Box>
                </Box>
            </Grid>
        </>
    );
}

const mapStateToProps = (state) => ({
    channel: state.channel,
    user: state.user.user,
});

export default connect(mapStateToProps, { postMessageToChannel })(Home);
