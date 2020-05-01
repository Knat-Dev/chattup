import React, { useState, useEffect } from 'react';
import {
    Grid,
    makeStyles,
    Typography,
    FormControl,
    TextField,
    Container,
    Button,
    useTheme,
    CircularProgress,
} from '@material-ui/core';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp, clearErrors } from '../../redux/actions/user';
const useStyles = makeStyles((theme) => ({
    container: {
        height: 'calc(100vh - 63.99px)',
    },
    title: {
        margin: '0.5rem 0 1rem 0',
    },
    icon: {
        fontSize: 36,
        color: theme.palette.primary.main,
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const Register = ({ history, errors, signUp, clearErrors }) => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const shouldLoad = (bool) => {
        setLoading(bool);
    };

    useEffect(() => {
        clearErrors();
    }, [clearErrors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = {
            displayName,
            email,
            password,
            confirmPassword,
        };
        setLoading(true);
        signUp(credentials, shouldLoad, history);
    };

    return (
        <Container>
            <Grid
                container
                className={classes.container}
                direction="column"
                alignContent="center"
                justify="center"
            >
                <Grid container justify="center">
                    <SyncAltIcon className={classes.icon} />
                </Grid>

                <Typography
                    align="center"
                    variant="h4"
                    className={classes.title}
                >
                    Register
                </Typography>
                <Grid container>
                    <Grid item sm={4} />
                    <Grid item sm={4}>
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth margin="dense">
                                <TextField
                                    name="displayName"
                                    value={displayName}
                                    onChange={(e) =>
                                        setDisplayName(e.target.value)
                                    }
                                    type="text"
                                    autoComplete="on"
                                    label="Display Name"
                                    variant="filled"
                                    placeholder="Display Name"
                                    error={errors.displayName ? true : false}
                                    helperText={errors.displayName}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <TextField
                                    autoComplete="username"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    label="Email"
                                    variant="filled"
                                    placeholder="Email"
                                    error={errors.email ? true : false}
                                    helperText={errors.email}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <TextField
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    label="Password"
                                    variant="filled"
                                    placeholder="Password"
                                    error={errors.password ? true : false}
                                    helperText={errors.password}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <TextField
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    type="password"
                                    label="Confirm Password"
                                    variant="filled"
                                    placeholder="Confirm Password"
                                    error={
                                        errors.confirmPassword ? true : false
                                    }
                                    helperText={errors.confirmPassword}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    onClick={handleSubmit}
                                    color="primary"
                                    variant="contained"
                                >
                                    {loading ? (
                                        <CircularProgress size={25} />
                                    ) : (
                                        'Submit'
                                    )}
                                </Button>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <Typography
                                    align="center"
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Already registered? click{' '}
                                    <Link className={classes.link} to="/login">
                                        here
                                    </Link>{' '}
                                    to log in.
                                </Typography>
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid item sm={4} />
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    errors: state.user.errors,
});

export default connect(mapStateToProps, { signUp, clearErrors })(Register);
