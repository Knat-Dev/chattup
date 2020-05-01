import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import {
    makeStyles,
    Box,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';

function Messages({ userChannels, messages, displayName, loading, onSuccess }) {
    useEffect(() => {
        messages && messages.length > 0 && onSuccess();
    }, [messages]);

    return (
        <>
            {userChannels && userChannels.length > 0 ? (
                loading ? (
                    <Box
                        height="100%"
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        style={{ flexDirection: 'column' }}
                    >
                        <CircularProgress
                            thickness={2}
                            size={50}
                            color="secondary"
                            style={{ marginBottom: '1rem' }}
                        />
                        <Typography variant="body1" color="primary">
                            Loading Messages...
                        </Typography>
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
                )
            ) : (
                <p>Please add a channel</p>
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
