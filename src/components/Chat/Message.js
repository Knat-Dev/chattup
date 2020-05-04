import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Avatar, Typography, Paper } from '@material-ui/core';
import { BorderStyle } from '@material-ui/icons';
import moment from 'moment';
import ChangingDate from './ChangingDate';
import PresenceAvatar from './PrecenceTracking/PresenceAvatar';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(1),
    },
    speech: {
        position: 'relative',
        background: (props) =>
            props.messageOwner ? theme.palette.primary.main : '#4f4f4f',
        borderRadius: '10px',
        padding: '20px',
        minWidth: '200px',
        maxWidth: '300px',
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    presenceAvatar: {
        marginRight: (props) => (!props.messageOwner ? 0 : theme.spacing(1)),
        marginLeft: (props) => (props.messageOwner ? 0 : theme.spacing(1)),
    },
    createdAtFrom: {
        marginBottom: theme.spacing(2),
    },
}));

export default function Message({ messageOwner, messageData }) {
    const props = { messageOwner };
    const classes = useStyles(props);
    const { body, displayName, photoURL, createdAt } = messageData;
    const [momentTime, setMomentTime] = useState(moment(createdAt).fromNow());
    useEffect(() => {
        const newVal = moment(createdAt).fromNow();
        setMomentTime(newVal);
        const Interval = setInterval(() => {
            const newVal = moment(createdAt).fromNow();
            setMomentTime(newVal);
        }, 1000);
        return () => {
            clearInterval(Interval);
        };
    }, [createdAt]);

    return (
        <>
            <Grid container>
                <Grid
                    container
                    alignItems="flex-start"
                    justify={messageOwner ? 'flex-start' : 'flex-end'}
                    className={classes.container}
                >
                    {messageOwner && (
                        <Grid item>
                            <PresenceAvatar
                                classNames={{
                                    avatar: classes.avatar,
                                    presenceAvatar: classes.presenceAvatar,
                                }}
                                avatarData={{
                                    photoURL,
                                    displayName,
                                    messageOwner,
                                }}
                            />
                        </Grid>
                    )}
                    <Grid item>
                        <Grid container direction="column">
                            <Paper elevation={5} className={classes.speech}>
                                <Typography variant="body1">
                                    {displayName}
                                </Typography>
                                <Typography
                                    className={classes.createdAtFrom}
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {momentTime}
                                </Typography>{' '}
                                <Typography variant="body1">{body}</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    {!messageOwner && (
                        <Grid item>
                            <PresenceAvatar
                                classNames={{
                                    avatar: classes.avatar,
                                    presenceAvatar: classes.presenceAvatar,
                                }}
                                avatarData={{ photoURL, displayName }}
                            />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
