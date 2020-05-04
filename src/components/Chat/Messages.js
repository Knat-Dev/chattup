import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import {
    makeStyles,
    Box,
    Typography,
    CircularProgress,
    Grow,
    Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import MessageSkeleton from './MessageSkeleton';
import transitions from '@material-ui/core/styles/transitions';
import Typing from './Typing';
import { database } from '../../firebase';

function Messages({
    messages,
    loading,
    onSuccess,
    user: { uid, displayName },
    channel: { channelId },
}) {
    const [typing, setTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setTyping(true);
            onSuccess();
        }, 1000);
    }, [typing]);

    useEffect(() => {
        setTypingUsers([]);

        if (channelId) {
            const typingRef = database.ref('typing').child(channelId);
            let typingUsers = [];

            console.log(channelId);

            const addedListener = typingRef.on('child_added', (snap) => {
                console.log(snap.val());
                if (snap.key !== uid) {
                    typingUsers = typingUsers.concat({
                        id: snap.key,
                        name: snap.val(),
                    });
                    console.log(typingUsers);
                }
                setTypingUsers(typingUsers);
            });

            const removedListener = typingRef.on('child_removed', (snap) => {
                const index = typingUsers.findIndex(
                    (user) => user.id === snap.key
                );
                if (index !== -1) {
                    typingUsers = typingUsers.filter(
                        (user) => user.id !== snap.key
                    );
                    setTypingUsers(typingUsers);
                }
            });

            const connectedRef = database.ref('.info/connected');
            const connectedListener = connectedRef.on('value', (snap) => {
                if (snap.val() === true) {
                    typingRef
                        .child(uid)
                        .onDisconnect()
                        .remove((err) => {
                            if (err !== null) console.error(err);
                        });
                }
            });

            return () => {
                typingRef.off('value', addedListener);
                typingRef.off('value', removedListener);
                connectedRef.off('value', connectedListener);
            };
        }
    }, [channelId]);

    useEffect(() => {
        messages && messages.length > 0 && onSuccess();
    }, [messages]);

    useEffect(() => {
        onSuccess();
    }, [typingUsers]);

    return (
        <>
            {loading ? (
                <Box height="100%" width="100%">
                    {[...Array(10)].map((item, index) => (
                        <MessageSkeleton
                            key={index}
                            messageOwner={index % 2 == 0 ? true : false}
                        />
                    ))}
                </Box>
            ) : messages.length > 0 ? (
                <>
                    {messages.map((message, index) => {
                        const { body, createdAt, photoURL } = message;

                        return message.displayName === displayName ? (
                            <Message
                                key={index}
                                messageOwner
                                messageData={{
                                    body,
                                    createdAt,
                                    displayName: message.displayName,
                                    photoURL,
                                }}
                            />
                        ) : (
                            <Message
                                key={index}
                                messageData={{
                                    body,
                                    createdAt,
                                    displayName: message.displayName,
                                    photoURL,
                                }}
                            />
                        );
                    })}
                    {typingUsers && typingUsers.length > 0 ? (
                        typingUsers.length === 1 ? (
                            <Typing quantity="singular" typing={typingUsers} />
                        ) : (
                            <Typing quantity="plural" typing={typingUsers} />
                        )
                    ) : null}
                </>
            ) : (
                <Box
                    height="100%"
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{ flexDirection: 'column' }}
                >
                    <Typography variant="body1" color="primary">
                        No messages, be the first to type!
                    </Typography>
                </Box>
            )}
        </>
    );
}

const mapStateToProps = (state) => ({
    userChannels: state.user.channels.list,
    messages: state.messages.list,
    loading: state.messages.loading,
    user: state.user.user,
    channel: state.channel,
});

export default connect(mapStateToProps)(Messages);
