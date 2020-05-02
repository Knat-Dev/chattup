import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import {
    makeStyles,
    Box,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import MessageSkeleton from './MessageSkeleton';

function Messages({ userChannels, messages, displayName, loading, onSuccess }) {
    useEffect(() => {
        messages && messages.length > 0 && onSuccess();
    }, [messages]);

    return (
        <>
            {loading ? (
                <Box
                    height="100%"
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{ flexDirection: 'column' }}
                >
                    {[...Array(4)].map((item, index) => (
                        <MessageSkeleton key={index} />
                    ))}
                </Box>
            ) : messages.length > 0 ? (
                messages.map((message, index) => {
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
                })
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
    displayName: state.user.user.displayName,
    loading: state.messages.loading,
});

export default connect(mapStateToProps)(Messages);
