import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Avatar, Typography } from '@material-ui/core';
import { BorderStyle } from '@material-ui/icons';
import moment from 'moment';
import ChangingDate from './ChangingDate';

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
        minWidth: '50px',
        maxWidth: '200px',
    },
    avatar: {
        marginRight: (props) => (!props.messageOwner ? 0 : theme.spacing(1)),
        marginLeft: (props) => (props.messageOwner ? 0 : theme.spacing(1)),
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));

export default function Message({ messageOwner, messageData }) {
    const props = { messageOwner };
    const classes = useStyles(props);
    const { body, displayName, photoURL, createdAt } = messageData;
    const [momentTime, setMomentTime] = useState(moment(createdAt).fromNow());
    useEffect(() => {
        const newVal = moment(createdAt).fromNow();
        console.log(newVal);
        setMomentTime(newVal);
        const Interval = setInterval(() => {
            const newVal = moment(createdAt).fromNow();
            console.log(newVal);
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
                            <Avatar src={photoURL} className={classes.avatar} />
                        </Grid>
                    )}
                    <Grid item>
                        <Grid container direction="column">
                            <div className={classes.speech}>
                                <Typography variant="body1">
                                    {displayName}
                                </Typography>
                                <Typography
                                    className={classes.messageFromDate}
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {momentTime}
                                </Typography>{' '}
                                <Typography variant="body1">{body}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                    {!messageOwner && (
                        <Grid item>
                            <Avatar src={photoURL} className={classes.avatar} />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
