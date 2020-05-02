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
const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
    },
}));

function PostMessageForm({
    channel,
    user: { displayName, photoURL },
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
            postMessageToChannel({
                body,
                displayName,
                photoURL: photoURL,
                channelId: channel.channelId,
            });
            setBody('');
        }
    };

    const colonToUnicode = (emoji) => {
        /**
         * let colonsRegex = new RegExp(
        '(^|\\s)(:[a-zA-Z0-9-_+]+:(?:::skin-tone-[2-6]:)?)',
        'g'
    );

    let match;
    while ((match = colonsRegex.exec(message))) {
        let colons = match[2];
        let offset = match.index + match[1].length;
        let length = colons.length;

        console.log(match, colons, offset, length);
        const emoji = emojiIndex.emojis['the_horns'][1].native;
        console.log(emoji);
        return emoji;
    }
         */
        // return message.replace(/:[A-Za-z0-9_+-]+:/g, (x) => {
        //     x = x.replace(/:/g, '');
        //     let emoji = emojiIndex.emojis[x];
        //     if (typeof emoji !== 'undefined') {
        //         let unicode = emoji.native;
        //         if (typeof unicode !== 'undefined') return unicode;
        //     }
        //     x = ':' + x + ':';
        //     return x;
        // });
        const oldBody = body;
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
                        onChange={(e) => setBody(e.target.value)}
                        size={matches ? 'small' : 'medium'}
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
