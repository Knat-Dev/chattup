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
  useMediaQuery,
  CircularProgress,
} from '@material-ui/core';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../redux/actions/user';
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

const Login = ({ errors, login, clearErrors }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const classes = useStyles();

  const shouldLoad = (bool) => {
    setLoading(bool);
  };

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    setLoading(true);
    login(userData, shouldLoad);
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

        <Typography align="center" variant="h4" className={classes.title}>
          Login
        </Typography>
        <Grid container>
          <Grid item sm={4} />
          <Grid item sm={4}>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="dense">
                <TextField
                  autoComplete="username"
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  label="Password"
                  variant="filled"
                  placeholder="Password"
                  error={errors.password ? true : false}
                  helperText={errors.password}
                />
              </FormControl>
              {errors.general && (
                <FormControl fullWidth margin="normal">
                  <Typography align="center" color="error" variant="body2">
                    {errors.general && errors.general.toString()}
                  </Typography>
                </FormControl>
              )}
              <FormControl fullWidth margin="normal">
                <Button
                  disabled={loading}
                  type="submit"
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                >
                  {loading ? <CircularProgress size={25} /> : 'Submit'}
                </Button>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Typography
                  align="center"
                  variant="body2"
                  color="textSecondary"
                >
                  Don't have an account? click{' '}
                  <Link className={classes.link} to="/register">
                    here
                  </Link>{' '}
                  to register.
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

export default connect(mapStateToProps, { login, clearErrors })(Login);
