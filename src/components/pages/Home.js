import React, { useRef, useEffect } from 'react';
import {
    makeStyles,
    Grid,
    Box,
    useTheme,
    useMediaQuery,
    Paper,
    Typography,
} from '@material-ui/core';
import NavList from '../layout/Navbar/NavList';
import { connect } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import Messages from '../Chat/Messages';
import { postMessageToChannel } from '../../redux/actions/messages';
import PostMessageForm from '../Chat/PostMessageForm';
import { usePageVisibility } from 'react-page-visibility';
import { database } from '../../firebase';
import { logout } from '../../redux/actions/user';

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

function Home({ channel, user: { displayName } }) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const messagesEndRef = useRef(null); // Scroll to bottom
    const isVisible = usePageVisibility();
    let con;

    useEffect(() => {
        console.log(displayName);
        const connectionsRef = database.ref(`connections/${displayName}`);
        const listener = database.ref('.info/connected').on('value', (snap) => {
            if (snap.val() == false) return;
            con = connectionsRef.push();
            con.onDisconnect().remove();
            if (isVisible)
                con.set({
                    state: 'online',
                    last_changed: new Date().toISOString(),
                });
            else
                con.set({
                    state: 'away',
                    last_changed: new Date().toISOString(),
                });
        });
        return () => {
            if (con) con.remove();
            connectionsRef.off('value', listener);
        };
    }, [isVisible]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) messagesEndRef.current.scrollIntoView();
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

export default connect(mapStateToProps, { postMessageToChannel, logout })(Home);
