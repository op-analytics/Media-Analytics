/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '200px',
  },
  input: {
    border: 'solid 1px black',
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

export default function Form() {
  const classes = useStyles();

  const [word, setWord] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  return (
    <form className={classes.form}>
      <FormControl className={classes.formControl}>
        <TextField
          label="Word:"
          name="word"
          className={classes.textField}
          value={word}
          margin="normal"
          onChange={e => setWord(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Year from:"
          name="year-from"
          className={classes.textField}
          value={yearFrom}
          margin="normal"
          onChange={e => setYearFrom(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Year to:"
          name="year-to"
          className={classes.textField}
          value={yearTo}
          margin="normal"
          onChange={e => setYearTo(e.target.value)}
        />
      </FormControl>
      <Button variant="outlined" color="primary" className={classes.button}>
        Submit
      </Button>
    </form>
  );
}
