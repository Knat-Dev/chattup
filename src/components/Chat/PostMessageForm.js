import React, { useState, useRef } from 'react';
import {
    makeStyles,
    FormControl,
    TextField,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery,
    ButtonGroup,
} from '@material-ui/core';
import { EmojiConvertor } from 'emoji-js';
import { connect } from 'react-redux';
import { postMessageToChannel } from '../../redux/actions/messages';
import { SendRounded } from '@material-ui/icons';
import Emoticons from './Emoticons';
import { emojiIndex } from 'emoji-mart';
import { database } from '../../firebase';
const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            paddingRight: 0,
            paddingLeft: 0,
        },
    },
}));

function PostMessageForm({
    scrollBottom,
    channel,
    user: { displayName, photoURL, uid },
    postMessageToChannel,
}) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const [body, setBody] = useState('');
    const textInput = useRef(null);

    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log(photoURL, displayName);
        if (body) {
            postMessageToChannel(
                {
                    body,
                    displayName,
                    photoURL: photoURL,
                    channelId: channel.channelId,
                },
                scrollBottom
            );
            setBody('');
            database.ref('typing').child(channel.channelId).child(uid).remove();
        }
    };

    const handleKeyDown = async () => {
        const typingRef = database.ref('typing');

        if (body) {
            await typingRef
                .child(channel.channelId)
                .child(uid)
                .set(displayName);
        }
    };

    const handleEmojiSelect = (emoji) => {
        console.log(emoji);
        const oldBody = body;
        const newBody = `${oldBody}${emoji}`;
        setBody(newBody);
        if (oldBody !== newBody)
            setTimeout(() => {
                textInput.current.focus();
            }, 0);
    };

    return (
        <>
            <form className={classes.form} onSubmit={handleSendMessage}>
                <FormControl fullWidth>
                    <TextField
                        inputRef={textInput}
                        value={body}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                            setBody(e.target.value);
                            if (e.target.value === '')
                                database
                                    .ref('typing')
                                    .child(channel.channelId)
                                    .child(uid)
                                    .remove();
                        }}
                        size={'small'}
                        variant="filled"
                        label="Message"
                        placeholder="Send Message"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Emoticons
                                        handleEmojiSelect={handleEmojiSelect}
                                    />
                                    <IconButton
                                        type="submit"
                                        onClick={handleSendMessage}
                                    >
                                        <SendRounded />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>
                </FormControl>
            </form>
        </>
    );
}
const mapStateToProps = (state) => ({
    channel: state.channel,
    user: state.user.user,
});
export default connect(mapStateToProps, { postMessageToChannel })(
    PostMessageForm
);
