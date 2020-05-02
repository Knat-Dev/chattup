import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { Popover, IconButton } from '@material-ui/core';
import { EmojiEmotionsOutlined } from '@material-ui/icons';

export default function Emoticons({ handleEmojiSelect }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handlePick = (emoji) => {
        handleEmojiSelect(emoji.native);
        handleClose();
    };

    return (
        <>
            <IconButton aria-describedby={id} onClick={handleClick}>
                <EmojiEmotionsOutlined />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Picker
                    emojiTooltip
                    native
                    onSelect={handlePick}
                    theme="dark"
                    title="Pick your emoji"
                    autoFocus
                    emoji="point_up_2"
                />
            </Popover>
        </>
    );
}
