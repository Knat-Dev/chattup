import React, { useState } from 'react';
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
import { connect } from 'react-redux';
import { postMessageToChannel } from '../../redux/actions/messages';
import { SendRounded, EmojiEmotionsOutlined } from '@material-ui/icons';
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

    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log(photoURL, displayName);
        postMessageToChannel({
            body,
            displayName,
            photoURL: photoURL,
            channelId: channel.channelId,
        });
        setBody('');
    };

    return (
        <>
            <form className={classes.form} onSubmit={handleSendMessage}>
                <FormControl fullWidth>
                    <TextField
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        size={matches ? 'small' : 'medium'}
                        variant="filled"
                        label="Message"
                        placeholder="Send Message"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <ButtonGroup>
                                        <IconButton
                                            type="submit"
                                            onClick={handleSendMessage}
                                        >
                                            <EmojiEmotionsOutlined />
                                        </IconButton>
                                        <IconButton
                                            type="submit"
                                            onClick={handleSendMessage}
                                        >
                                            <SendRounded />
                                        </IconButton>
                                    </ButtonGroup>
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
