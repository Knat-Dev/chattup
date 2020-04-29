import React, { useEffect } from 'react';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    List,
} from '@material-ui/core';
import {
    SyncAlt as SyncAltIcon,
    ExpandLess,
    ExpandMore,
} from '@material-ui/icons';
import Channels from './Channels';

export default function YourChannels() {
    const getInitialState = () => {
        const isOpen = localStorage.getItem('yourChannelsOpen');
        if (isOpen) return JSON.parse(isOpen);
        else localStorage.setItem('yourChannelsOpen', JSON.stringify(true));
    };
    const [open, setOpen] = React.useState(getInitialState());

    const handleClick = () => {
        setOpen(!open);
        localStorage.setItem('yourChannelsOpen', JSON.stringify(!open));
    };
    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <SyncAltIcon />
                </ListItemIcon>
                <ListItemText primary="Your Channels" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Channels />
                </List>
            </Collapse>
        </>
    );
}
