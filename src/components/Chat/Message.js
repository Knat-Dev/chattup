import React from 'react';
import { makeStyles, Grid, Avatar } from '@material-ui/core';
import { BorderStyle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: '300px',
  },
  speech: {
    margin: '1rem',
    position: 'relative',
    background: theme.palette.primary.main,
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '400px',
  },
}));

export default function Message() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.container}>
        <div className={classes.speech}>hi</div>
      </Grid>
    </>
  );
}
