import React from 'react';
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    background: '#303030',
    height: '100vh',
  },
}));

export default function LoadingPage() {
  const classes = useStyles();
  return (
    <Grid
      className={classes.grid}
      container
      justify="center"
      alignContent="center"
    >
      <CircularProgress size={150} thickness={2} color="primary" />
    </Grid>
  );
}
