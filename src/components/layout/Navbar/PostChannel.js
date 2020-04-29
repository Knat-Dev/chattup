import React, { useState } from 'react';
import {
    makeStyles,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogContentText,
    FormControl,
    TextField,
    CircularProgress,
    Button,
    DialogActions,
    Typography,
} from '@material-ui/core';
import firebase, { storage, database } from '../../../firebase';
import { uuid } from 'uuidv4';
import { Add, Close as CloseIcon, CloudUpload } from '@material-ui/icons';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    content: { padding: '1rem' },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: 'white',
    },
    title: {
        color: 'white',
        background: theme.palette.primary.main,
    },
}));

const PostChannel = ({ displayName }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const editPhoto = () => {
        const fileInput = document.getElementById('file-upload');
        fileInput.click();
    };

    const handleUpload = () => {
        const fileName = uuid() + '.' + file.name.split('.')[1];
        const storageRef = storage.ref();
        var uploadTask = storageRef.child(`images/${fileName}`).put(file);
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            function (error) {
                console.error(error);
            },
            function () {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
                    setImgUrl(downloadUrl);
                });
            }
        );
    };

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChanged = (e) => {
        const f = e.target.files[0];
        console.log(f);
        setFile(f);
    };

    const fileRename = (fileName) => {
        if (fileName.length <= 50) return fileName;
        return fileName.slice(0, 20) + '...' + fileName.slice(-10);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (name === '') errors.name = 'Must not be empty';

        setLoading(true);
        if (file !== null) await handleUpload();

        database
            .ref('channels')
            .push()
            .then((ref) => {
                ref.set({
                    channelId: ref.key,
                    channelOwner: displayName,
                    channelName: name,
                    createdAt: new Date().toISOString(),
                    channelPhoto: imgUrl
                        ? imgUrl
                        : 'https://firebasestorage.googleapis.com/v0/b/chaterinno.appspot.com/o/images%2F5dfa1ed1-5f10-4495-96d6-5bd5d23c785f.png?alt=media&token=35c389f8-b1e6-4763-9f1b-d103303a8478',
                }).then(() => {
                    database
                        .ref('userChannel')
                        .child(displayName)
                        .update({
                            [ref.key]: name,
                        });
                });
            })
            .then(() => {
                setLoading(false);
                setOpen(false);
                setFile(null);
                setName('');
            });
    };

    return (
        <>
            <ListItem
                button
                className={classes.nested}
                onClick={handleClickOpen}
            >
                <ListItemIcon>
                    <Add />
                </ListItemIcon>
                <ListItemText primary="Add Channel" />
            </ListItem>
            <Dialog open={open} onClose={handleClose} maxWidth="sm">
                <DialogTitle className={classes.title}>
                    Create Channel{' '}
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <div className={classes.content}>
                    <form>
                        <DialogContent>
                            <DialogContentText>
                                Create a chat room for you and your friends!
                            </DialogContentText>

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    autoFocus
                                    variant="outlined"
                                    label="Channel Name"
                                    placeholder="Channel Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></TextField>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <Typography variant="body1">
                                    Channel Photo:{' '}
                                    {file
                                        ? fileRename(file.name)
                                        : 'Choose File...'}{' '}
                                    <IconButton onClick={editPhoto}>
                                        <CloudUpload />
                                    </IconButton>
                                    <input
                                        hidden="hidden"
                                        type="file"
                                        id="file-upload"
                                        onChange={handleFileChanged}
                                    />
                                </Typography>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary">
                                Cacnel
                            </Button>
                            <Button
                                disabled={loading ? true : false}
                                type="submit"
                                onClick={handleSubmit}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={25}
                                        color="primary"
                                    />
                                ) : (
                                    'Create'
                                )}
                            </Button>
                        </DialogActions>
                    </form>
                </div>
            </Dialog>
        </>
    );
};

export default connect()(PostChannel);
