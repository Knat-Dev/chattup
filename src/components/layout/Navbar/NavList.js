import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import YourChannels from './YourChannels';
import AllChannels from './AllChannels';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    list: {
        maxWidth: 320,
        [theme.breakpoints.down('xs')]: {
            width: 250,
        },
    },
}));

export default function NavList() {
    const classes = useStyles();

    return (
        <div className={classes.list}>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                <YourChannels />
                <AllChannels />
            </List>
        </div>
    );
}
