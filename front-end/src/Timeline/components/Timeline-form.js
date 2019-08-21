/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '200px',
  },
  input: {
    border: 'solid 1px black',
  },
}));

export default function Form() {
  const classes = useStyles();

  const [word, setWord] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  return (
    <form className={classes.form}>
      <TextField
        label="Word:"
        name="word"
        className={classes.textField}
        value={word}
        margin="normal"
        onChange={e => setWord(e.target.value)}
      />
      <TextField
        label="Year from:"
        name="year-from"
        className={classes.textField}
        value={yearFrom}
        margin="normal"
        onChange={e => setYearFrom(e.target.value)}
      />
      <TextField
        label="Year to:"
        name="year-to"
        className={classes.textField}
        value={yearTo}
        margin="normal"
        onChange={e => setYearTo(e.target.value)}
      />
      <input type="submit" value="submit" />
    </form>
  );
}
