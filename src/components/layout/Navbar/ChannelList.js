import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { database } from '../../../firebase';
import {
    ListItem,
    ListItemIcon,
    makeStyles,
    ListItemText,
    CircularProgress,
    Typography,
    Button,
    ListItemSecondaryAction,
} from '@material-ui/core';
import HashtagIcon from '../../../images/hashtag.svg';
import { joinChannel } from '../../../redux/actions/user';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    centered: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

function ChannelList({
    joinChannel,
    userChannels,
    loading,
    allChannels,
    isAll,
    loadingAll,
}) {
    const classes = useStyles();

    const channelListMarkup = (
        <>
            {isAll ? (
                // All Channels
                allChannels.length > 0 ? (
                    allChannels.map((channel) => (
                        <ListItem
                            key={channel.channelId}
                            button
                            className={classes.nested}
                        >
                            <ListItemIcon>
                                <img
                                    alt=""
                                    src={HashtagIcon}
                                    className="MuiSvgIcon-root"
                                    style={{
                                        width: '15px',
                                        marginLeft: '5px',
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={channel.channelName} />
                            <ListItemSecondaryAction>
                                <Button
                                    onClick={() =>
                                        joinChannel(
                                            channel.channelId,
                                            channel.channelName
                                        )
                                    }
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                >
                                    Join
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                ) : loadingAll ? (
                    <ListItem
                        className={classes.nested}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress size={25} color="primary" />
                    </ListItem>
                ) : (
                    <ListItem className={classes.nested}>
                        <Typography
                            align="center"
                            variant="body2"
                            color="secondary"
                        >
                            No channels found, press the button below to add one
                        </Typography>
                    </ListItem>
                )
            ) : // Your Channels
            !loading && userChannels.length > 0 ? (
                userChannels.map((channel) => (
                    <ListItem
                        key={channel.channelId}
                        button
                        className={classes.nested}
                    >
                        <ListItemIcon>
                            <img
                                alt=""
                                src={HashtagIcon}
                                className="MuiSvgIcon-root"
                                style={{ width: '15px', marginLeft: '5px' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={channel.channelName} />
                    </ListItem>
                ))
            ) : loading ? (
                <ListItem
                    className={classes.nested}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <CircularProgress size={25} color="primary" />
                </ListItem>
            ) : (
                <ListItem className={classes.nested}>
                    <Typography
                        align="center"
                        variant="body2"
                        color="secondary"
                    >
                        No channels found, press the button below to add one
                    </Typography>
                </ListItem>
            )}
        </>
    );

    return <>{channelListMarkup}</>;
}

const mapStateToProps = (state) => ({
    displayName: state.user.user.displayName,
    userChannels: state.user.channels.list,
    allChannels: state.channels.list,
    loadingAll: state.channels.loading,
    loading: state.user.channels.loading,
});

export default connect(mapStateToProps, { joinChannel })(ChannelList);
