/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

// TODO:Update production url.
const apiUrl = process.env.NODE_ENV === 'production' ? 'http://example.com' : process.env.REACT_APP_API_URL;

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    border: 'solid 1px black',
  },
}));

export default function Form({ setTimelineData }) {
  const classes = useStyles();

  const [word, setWord] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    Axios.post(
      `${apiUrl}timeline/frequency`,
      {
        word,
        year_from: yearFrom,
        year_to: yearTo,
      },
      { headers: { 'Content-Type': 'application/json' } },
    )
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label>
        Word:
        <input
          type="text"
          name="word"
          className={classes.input}
          value={word}
          onChange={e => setWord(e.target.value)}
        />
      </label>

      <label>
        Year from:
        <input
          type="text"
          name="year-from"
          className={classes.input}
          value={yearFrom}
          onChange={e => setYearFrom(e.target.value)}
        />
      </label>

      <label>
        Year to:
        <input
          type="text"
          name="year-to"
          className={classes.input}
          value={yearTo}
          onChange={e => setYearTo(e.target.value)}
        />
      </label>

      <input type="submit" value="submit" />
    </form>
  );
}
