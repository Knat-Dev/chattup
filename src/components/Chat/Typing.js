import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Paper, Typography, Grow } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    speech: {
        margin: theme.spacing(2),
        position: 'relative',
        background: '#555',
        borderRadius: '10px',
        fontStyle: 'italic',
        minWidth: '200px',
        maxWidth: '500px',
    },
    avatar: {
        width: theme.spacing(2),
        height: theme.spacing(2),
    },

    dot: {
        width: '6px',
        height: '6px',
        margin: '0 5px',
        background: '#efefef',
        borderRadius: '50%',
        opacity: 0,
        animation: '$typing 0.8s infinite',
        '&:nth-child(1)': {
            animationDelay: '0s',
        },
        '&:nth-child(2)': {
            animationDelay: '0.2s',
        },
        '&:nth-child(3)': {
            animationDelay: '0.4s',
            marginRight: theme.spacing(2),
        },
    },
    '@keyframes typing': {
        '0%': {
            transform: 'scale(0.8)',
            opacity: 0,
        },
        '50%': {
            transform: 'scale(1)',
            opacity: 0.8,
        },
        '100%': {
            transform: 'scale(1.5)',
            opacity: 0,
        },
    },
    flex: {
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
    },
}));

function Typing({ typing, quantity }) {
    const classes = useStyles();
    const [sentence, setSentence] = useState('');
    const [names, setNames] = useState('');

    useEffect(() => {
        console.log(typing);
        if (typing && typing.length > 0) {
            quantity === 'singular'
                ? setSentence('is typing.')
                : setSentence('are typing.');
            if (quantity !== 'singular') {
                let names = typing.map((user) => {
                    return user.name;
                });
                var namesStr =
                    names.slice(0, -1).join(', ') + ' and ' + names.slice(-1);
                console.log(namesStr);
                setNames(namesStr);
            } else {
                setNames(typing[0].name);
            }
        }
    }, [typing]);
    return (
        <Grow in={typing.length > 0 ? true : false}>
            <Paper elevation={5} className={classes.speech}>
                <div className={classes.flex}>
                    <div className={classes.dot}></div>
                    <div className={classes.dot}></div>
                    <div className={classes.dot}></div>
                    {names} {sentence}
                </div>
            </Paper>
        </Grow>
    );
}

export default Typing;
