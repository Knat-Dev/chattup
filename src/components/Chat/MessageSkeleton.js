import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Avatar, Typography, Paper } from '@material-ui/core';
import { BorderStyle } from '@material-ui/icons';
import moment from 'moment';
import ChangingDate from './ChangingDate';
import { Skeleton } from '@material-ui/lab';

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
        marginRight: (props) => (!props.messageOwner ? 0 : theme.spacing(1)),
        marginLeft: (props) => (props.messageOwner ? 0 : theme.spacing(1)),
    },
    createdAtFrom: {
        marginBottom: theme.spacing(2),
    },
}));

export default function Message({ messageOwner }) {
    const props = { messageOwner };
    const classes = useStyles(props);

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
                            <Skeleton
                                variant="circle"
                                className={classes.avatar}
                            />
                        </Grid>
                    )}
                    <Grid item>
                        <Grid container direction="column">
                            <Paper elevation={5} className={classes.speech}>
                                <Typography variant="body1">
                                    <Skeleton width={50} />
                                </Typography>
                                <Typography
                                    className={classes.createdAtFrom}
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    <Skeleton width={80} />
                                </Typography>{' '}
                                <Typography variant="body1">
                                    <Skeleton width={100} />
                                    <Skeleton width={90} />
                                    <Skeleton width={100} />
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    {!messageOwner && (
                        <Grid item>
                            <Skeleton
                                variant="circle"
                                className={classes.avatar}
                            />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
