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
import ChannelList from './ChannelList';

export default function AllChannels() {
    const getInitialState = () => {
        const isOpen = localStorage.getItem('allChannelsOpen');
        if (isOpen) return JSON.parse(isOpen);
        else localStorage.setItem('allChannelsOpen', JSON.stringify(true));
    };
    const [open, setOpen] = React.useState(getInitialState());

    const handleClick = () => {
        setOpen(!open);
        localStorage.setItem('allChannelsOpen', JSON.stringify(!open));
    };
    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <SyncAltIcon />
                </ListItemIcon>
                <ListItemText primary="Join Channels" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ChannelList isAll />
                </List>
            </Collapse>
        </>
    );
}
