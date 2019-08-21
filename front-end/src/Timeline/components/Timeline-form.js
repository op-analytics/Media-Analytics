/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? '/api/' : process.env.REACT_APP_API_URL;

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    border: 'solid 1px black',
  },
  formControl: {
    margin: theme.spacing(1),
  },
  button: {
    maxHeight: '40px',
    marginTop: '36px',
  },
}));

function Form({ setTimelineData }) {
  const classes = useStyles();

  const [word, setWord] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  const extractLabelsFromResponse = response => response.data.data.reduce((data, { year }) => data.concat(year), []);

  const createDataset = data => ({
    label: data[0].word,
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    pointBorderColor: 'rgba(172,75,125,0.8)',
    pointBackgroundColor: 'rgba(172,75,125,1)',
    pointBorderWidth: 1.5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderWidth: 2,
    pointHitRadius: 10,
    data,
  });

  const onSubmitHandler = e => {
    e.preventDefault();
    Axios.post(`${API_URL}timeline/frequency`, { word, year_from: yearFrom, year_to: yearTo })
      .then(response => {
        setTimelineData({
          labels: extractLabelsFromResponse(response),
          datasets: [
            createDataset(
              response.data.data.reduce(
                (accum, data) => accum.concat({ ...data, y: data.wordFreq }),
                [],
              ),
            ),
          ],
        });
      })
      .catch(error => console.log(error.response));
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
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
      <Button variant="outlined" color="primary" type="submit" className={classes.button}>
        Submit
      </Button>
    </form>
  );
}

Form.propTypes = {
  setTimelineData: PropTypes.func.isRequired,
};

export default Form;
