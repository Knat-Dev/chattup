import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Avatar, Typography } from '@material-ui/core';
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
        background: theme.palette.primary.main,
        borderRadius: '10px',
        padding: '20px',
        minWidth: '50px',
        maxWidth: '200px',
    },
    avatar: {
        marginRight: theme.spacing(1),
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));

export default function MessageSkeleton() {
    const classes = useStyles();
    return (
        <>
            <Grid container>
                <Grid
                    container
                    alignItems="flex-start"
                    justify={'flex-start'}
                    className={classes.container}
                >
                    <Grid item>
                        <Skeleton variant="circle" className={classes.avatar} />
                    </Grid>

                    <Grid item>
                        <Grid container direction="column">
                            <div className={classes.speech}>
                                <Typography variant="body1">
                                    <Skeleton width={75} />
                                </Typography>
                                <Typography
                                    className={classes.messageFromDate}
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    <Skeleton width={100} />
                                </Typography>{' '}
                                <Typography variant="body1">
                                    {' '}
                                    <Skeleton width={75} />
                                    <Skeleton width={75} />
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
