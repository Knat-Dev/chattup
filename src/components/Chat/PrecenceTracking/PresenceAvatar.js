import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Badge, withStyles, Avatar } from '@material-ui/core';
import { database } from '../../../firebase';

const OfflineBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#8f8f8f',
        color: '#8f8f8f',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
        },
    },
}))(Badge);

const OnlineBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const AwayBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#fcba03',
        color: '#fcba03',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
        },
    },
}))(Badge);

export const PresenceAvatar = ({
    classNames: { avatar, presenceAvatar },
    avatarData: { displayName, photoURL, messageOwner },
}) => {
    const [state, setState] = useState('offline');
    useEffect(() => {
        const statusRef = database.ref(`status/${displayName}`);
        const listener = statusRef.on('value', (snapshot) => {
            const status = snapshot.val().state;
            setState(status);
        });
        return () => {
            statusRef.off('value', listener);
        };
    }, []);

    return (
        <div>
            {state === 'online' ? (
                <OnlineBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: messageOwner ? 'left' : 'right',
                    }}
                    variant="dot"
                    className={presenceAvatar}
                >
                    <Avatar className={avatar} alt="" src={photoURL} />
                </OnlineBadge>
            ) : state === 'offline' ? (
                <OfflineBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: messageOwner ? 'left' : 'right',
                    }}
                    variant="dot"
                    className={presenceAvatar}
                >
                    <Avatar className={avatar} alt="" src={photoURL} />
                </OfflineBadge>
            ) : (
                <AwayBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: messageOwner ? 'left' : 'right',
                    }}
                    variant="dot"
                    className={presenceAvatar}
                >
                    <Avatar className={avatar} alt="" src={photoURL} />
                </AwayBadge>
            )}
        </div>
    );
};

export default PresenceAvatar;
